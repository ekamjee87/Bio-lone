"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function AnatomyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const modelType = searchParams.get('model') || 'male';
  const isFemale = modelType === 'female';
  
  const modelPath = isFemale 
    ? '/Models/01- corch.Female.Musclenames.Anatomy/cda17af4be354c8b8375ff0b1b8a5fe5.gltf'
    : '/Models/malesss/9bfa112a99844626ac2480fff6276f0e_Textured.gltf';

  const femaleTexturePath = '/Models/01- corch.Female.Musclenames.Anatomy/b4913207e286490998e652dd17009ac3_RGB_diffuse.jpeg';

  useEffect(() => {
    if (!containerRef.current) return;
    setLoading(true);
    setProgress(0);

    const timer = setTimeout(() => {
        initEngine();
    }, 150);

    let animeId: number;
    let renderer: THREE.WebGLRenderer;

    function initEngine() {
        if (!containerRef.current) return;
        
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        containerRef.current.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 1.5));
        const keyLight = new THREE.DirectionalLight(0xffffff, 2);
        keyLight.position.set(5, 10, 10);
        scene.add(keyLight);

        // Load Female Texture for injection
        const textureLoader = new THREE.TextureLoader();
        const femaleTex = isFemale ? textureLoader.load(femaleTexturePath) : null;
        if (femaleTex) femaleTex.colorSpace = THREE.SRGBColorSpace;

        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
          modelPath,
          (gltf) => {
            const model = gltf.scene;
            
            model.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                if (child.material) {
                  // INJECT FEMALE TEXTURE
                  if (isFemale && femaleTex) {
                    child.material.map = femaleTex;
                  }
                  
                  child.material.vertexColors = false;
                  child.material.side = THREE.DoubleSide;
                  child.material.roughness = 0.6;
                  child.material.needsUpdate = true;
                }
              }
            });

            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const scale = (isFemale ? 9 : 7.5) / Math.max(size.x, size.y, size.z);
            
            model.scale.setScalar(scale);
            model.position.sub(center.multiplyScalar(scale));
            model.position.y = -size.y * scale / 2.2;

            scene.add(model);
            setLoading(false);
          },
          (xhr) => {
              if (xhr.total > 0) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        );

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const animate = () => {
          animeId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
    }

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animeId);
      if (containerRef.current && renderer?.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, [modelPath, isFemale]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#f0f0f0]" ref={containerRef}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f0f0f0] z-50">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 font-mono text-[9px] uppercase tracking-widest">
              Injecting {modelType.toUpperCase()} Textures... {progress}%
            </p>
          </div>
        </div>
      )}

      {/* HUD */}
      <div className="absolute top-8 left-8 pointer-events-none z-10 opacity-50 text-black">
        <div className="font-mono text-[9px] uppercase tracking-[0.4em] font-bold text-black">Anatomy Engine v8.2</div>
        <div className="font-mono text-[7px] mt-1 text-blue-600">Active Scan: {modelType.toUpperCase()}</div>
      </div>
    </div>
  );
}
