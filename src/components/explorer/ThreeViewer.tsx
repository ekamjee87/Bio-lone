"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

function MaleModel() {
  const [obj, setObj] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    // Load ALL textures properly
    const bodyAlbedo = textureLoader.load("/Models/Male Body/d00696ebd8c446cda329258762e37431_RGB_bodyMatt_albedo.jpeg");
    bodyAlbedo.colorSpace = THREE.SRGBColorSpace;

    const headAlbedo = textureLoader.load("/Models/Male Body/1a1b66b77b13432d95da3802cfb03abe_RGB_headMatt_Base_Color.png");
    headAlbedo.colorSpace = THREE.SRGBColorSpace;

    const bodyNormal = textureLoader.load("/Models/Male Body/bd736562a1e141dbab1c8b24fb1538ca_N_bodyMatt_normal.jpeg");
    const headNormal = textureLoader.load("/Models/Male Body/c02a4c68d57845179f2a8d09f7a03ebd_N_headMatt_normal.jpeg");

    const bodyRoughness = textureLoader.load("/Models/Male Body/2ddcef43f5174787b32065a44e1a74f8_R_bodyMatt_Roughness.png");
    const headRoughness = textureLoader.load("/Models/Male Body/8e329f282c0148d1906906d57090ec2b_R_headMatt_Roughness.png");

    const bodyAO = textureLoader.load("/Models/Male Body/48f6b81284734416848111497fdbcba5_R_bodyMatt_AO.jpeg");
    const headAO = textureLoader.load("/Models/Male Body/a1cef4343e5140d88fd83192cbef396e_R_headMatt_AO.jpeg");

    const bodyCavity = textureLoader.load("/Models/Male Body/ba969ef13f76485f8e3bc9c0040deb8b_R_bodyMatt_cavity.jpeg");
    const headCavity = textureLoader.load("/Models/Male Body/1c8e807925004748bdb2854951d1bbea_R_headMatt_cavity.jpeg");

    const eyeTexture = textureLoader.load("/Models/Male Body/0c841c43ab80438c997aed895fec509e_RGB_eye_L_3_TXTR.png");
    eyeTexture.colorSpace = THREE.SRGBColorSpace;

    // Load MTL first for proper mesh-to-material mapping
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath("/Models/Male Body/");
    mtlLoader.load("9bfa112a99844626ac2480fff6276f0e.mtl", (materials: any) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("/Models/Male Body/");
      objLoader.load(
        "9bfa112a99844626ac2480fff6276f0e.obj",
        (loadedObj: any) => {
          // Now traverse and replace materials based on material name
          loadedObj.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              const matName = (child.material as THREE.Material)?.name || "";
              console.log("Mesh:", child.name, "Material:", matName);

              if (matName.includes("material_4")) {
                // Body material (dark red in MTL = body/muscle)
                child.material = new THREE.MeshStandardMaterial({
                  map: bodyAlbedo,
                  normalMap: bodyNormal,
                  normalScale: new THREE.Vector2(1, 1),
                  roughnessMap: bodyRoughness,
                  aoMap: bodyAO,
                  aoMapIntensity: 1.0,
                  roughness: 0.7,
                  metalness: 0.0,
                  side: THREE.FrontSide,
                });
              } else if (matName.includes("material_3")) {
                // Head material (gray in MTL)
                child.material = new THREE.MeshStandardMaterial({
                  map: headAlbedo,
                  normalMap: headNormal,
                  normalScale: new THREE.Vector2(1, 1),
                  roughnessMap: headRoughness,
                  aoMap: headAO,
                  aoMapIntensity: 1.0,
                  roughness: 0.7,
                  metalness: 0.0,
                  side: THREE.FrontSide,
                });
              } else if (matName.includes("material_1")) {
                // Eyes (blue-ish in MTL)
                child.material = new THREE.MeshStandardMaterial({
                  map: eyeTexture,
                  roughness: 0.3,
                  metalness: 0.1,
                  side: THREE.FrontSide,
                });
              } else if (matName.includes("material_2")) {
                // Cornea (transparent-ish)
                child.material = new THREE.MeshPhysicalMaterial({
                  roughness: 0.0,
                  metalness: 0.0,
                  transparent: true,
                  opacity: 0.4,
                  transmission: 0.9,
                  side: THREE.FrontSide,
                });
              } else {
                // Fallback - apply body texture
                child.material = new THREE.MeshStandardMaterial({
                  map: bodyAlbedo,
                  normalMap: bodyNormal,
                  roughness: 0.7,
                  metalness: 0.0,
                  side: THREE.FrontSide,
                });
              }
            }
          });

          // Center & scale
          const box = new THREE.Box3().setFromObject(loadedObj);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleFactor = 8 / maxDim;
          loadedObj.scale.setScalar(scaleFactor);

          const box2 = new THREE.Box3().setFromObject(loadedObj);
          const center2 = box2.getCenter(new THREE.Vector3());
          loadedObj.position.sub(center2);

          setObj(loadedObj);
        },
        (xhr: any) => {
          if (xhr.total > 0) {
            console.log(Math.round((xhr.loaded / xhr.total) * 100) + "% loaded");
          }
        },
        (err: any) => console.error("OBJ load error:", err)
      );
    });
  }, []);

  if (!obj) return null;
  return <primitive object={obj} />;
}

export default function ThreeViewer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: "#666666" }}>
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-white text-sm">Loading Model...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" style={{ background: "#666666" }}>
      <Canvas
        style={{ background: "#666666" }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <color attach="background" args={["#666666"]} />

        {/* Balanced studio lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 7]} intensity={2} color="#ffffff" castShadow />
        <directionalLight position={[-5, 8, -5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[0, -3, 5]} intensity={0.8} color="#ffffff" />
        <hemisphereLight args={["#ffffff", "#666666", 1]} />

        <Suspense fallback={null}>
          <MaleModel />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={18}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Status badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="px-5 py-2 rounded-full flex items-center gap-2 bg-black/50 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-white text-[10px] font-mono tracking-widest uppercase">Male Anatomy Explorer</span>
        </div>
      </div>
    </div>
  );
}
