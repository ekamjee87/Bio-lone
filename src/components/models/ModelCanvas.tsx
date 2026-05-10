"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ModelCanvasProps {
  modelPath: string;
}

export default function ModelCanvas({ modelPath }: ModelCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;
    
    setLoading(true);
    setProgress(0);

    let animeId: number;
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f7);

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1, 10);

    if (!rendererRef.current) {
        rendererRef.current = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            preserveDrawingBuffer: true
        });
        rendererRef.current.outputColorSpace = THREE.SRGBColorSpace;
    }
    const renderer = rendererRef.current;
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0xffffff, 0.5);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xffffff, 0.7);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const gltfLoader = new GLTFLoader();
    
    gltfLoader.load(
      modelPath,
      (gltf: any) => {
        const model = gltf.scene;

        model.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            
            materials.forEach((material: any) => {
              if (!material) return;
              
              material.side = THREE.DoubleSide;
              const name = (child.name || "").toLowerCase();
              const matName = (material.name || "").toLowerCase();

              // Special handling for Eye models
              const isEyePart = name.includes('eye') || matName.includes('eye');
              const isOuterShell = matName.includes('standard') || name.includes('eye_1') || matName.includes('cornea');

              if (!material.map) {
                if (isEyePart && isOuterShell) {
                  // Make the outer eye shell (cornea) transparent
                  material.transparent = true;
                  material.opacity = 0.3;
                  material.color.set(0xffffff);
                  material.roughness = 0.1;
                  material.metalness = 0.1;
                } else if (name.includes('kidney') || name.includes('cortex') || name.includes('medulla')) {
                   material.color.set(0xd47a7a); // Kidney Flesh Red
                } else if (name.includes('skull') || name.includes('bone')) {
                   material.color.set(0xf5f5dc); // Bone Beige
                } else if (name.includes('ovum') || name.includes('uterus')) {
                   material.color.set(0xeec9d2); // Soft Pink Tissue
                } else if (isEyePart && !isOuterShell) {
                   material.color.set(0xffffff); // Inner eye parts default white if no texture
                }
                
                // If it's still white/grey and not meant to be transparent, give it a default tissue color
                if (!material.transparent && (material.color.getHex() === 0xffffff || material.color.getHex() === 0xcccccc)) {
                   material.color.set(0xf0d0d0);
                }
              } else {
                // Texture is present, ensure it pops
                if (material.map) material.map.colorSpace = THREE.SRGBColorSpace;
                material.color.set(0xffffff); 
                material.vertexColors = false;
                
                // Apply a nice gloss to textured parts if they are eye parts
                if (isEyePart) {
                  material.roughness = 0.2;
                }
              }

              if (material.needsUpdate) material.needsUpdate = true;
            });
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 8 / maxDim;
        
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        scene.add(model);
        setLoading(false);
      },
      (xhr: any) => {
        if (xhr.total > 0) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
      }
    );

    const animate = () => {
      animeId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animeId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#f5f5f7]">
      <div ref={mountRef} className="w-full h-full" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f5f5f7] z-50">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-10 h-10 border-4 border-[#2a134d] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#2a134d] font-bold text-xs uppercase tracking-widest">
              Synthesizing Anatomy... {progress}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
