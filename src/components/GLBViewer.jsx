import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function Model({ url }) {
  const meshRef = useRef();
  const { scene } = useGLTF(url);
  
  // Simple auto-rotate
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={0.8} 
      position={[0, 0, 0]} 
    />
  );
}

function GLBViewer({ src, title }) {
  return (
    <div className="w-full h-[40vh] bg-gray-800 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <Suspense fallback={
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-white">Loading {title}...</div>
          </div>
        }>
          <ambientLight intensity={0.8} />
          <directionalLight position={[1, 1, 1]} intensity={1} />
          <Model url={src} />
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
        3D Model: {title}
      </div>
    </div>
  );
}

export default GLBViewer;
