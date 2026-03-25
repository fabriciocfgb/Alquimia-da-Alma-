import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SacredGeometry3D = ({ mode = 'alignment', onWebGLFallback }: { mode: string, onWebGLFallback?: () => void }) => {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const available = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        setWebglAvailable(available);
        if (!available && onWebGLFallback) {
          onWebGLFallback();
        }
      } catch (e) {
        setWebglAvailable(false);
        if (onWebGLFallback) onWebGLFallback();
      }
    };
    checkWebGL();
  }, [onWebGLFallback]);

  if (webglAvailable === false) return null;
  if (webglAvailable === null) return null;

  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-black overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: true
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#000000'), 0);
        }}
        onError={(e) => {
          console.error("WebGL Error:", e);
          setWebglAvailable(false);
          if (onWebGLFallback) onWebGLFallback();
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <GeometryNode mode={mode} />
        </Float>
      </Canvas>
    </div>
  );
};

const GeometryNode = ({ mode }: { mode: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const geometry = useMemo(() => {
    switch (mode) {
      case 'growth':
        return <octahedronGeometry args={[1, 0]} />;
      case 'memory':
        return <icosahedronGeometry args={[1.5, 0]} />;
      default:
        return <dodecahedronGeometry args={[1.5, 0]} />;
    }
  }, [mode]);

  const color = useMemo(() => {
    switch (mode) {
      case 'growth': return '#fbbf24';
      case 'memory': return '#60a5fa';
      default: return '#10b981';
    }
  }, [mode]);

  // Fractal branches for growth mode
  const branches = useMemo(() => {
    if (mode !== 'growth') return null;
    const items = [];
    const phi = 1.618;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.cos(angle) * 2;
      const y = Math.sin(angle) * 2;
      items.push(
        <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
          {/* Sub-branches */}
          <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.05, 0.5, 0.05]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} wireframe />
          </mesh>
        </mesh>
      );
    }
    return items;
  }, [mode, color]);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      {branches}
    </group>
  );
};

export default SacredGeometry3D;
