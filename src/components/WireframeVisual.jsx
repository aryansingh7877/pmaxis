import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WireframeVisual({ className = "w-full h-full" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for layered 3D Market Wireframe
    const group = new THREE.Group();
    scene.add(group);

    // 1. Primary Topological Orderbook Surface (Curved hyperbolic wireframe lattice)
    const geom1 = new THREE.TorusGeometry(2.1, 0.75, 20, 60);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x1A1A1A,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const mesh1 = new THREE.Mesh(geom1, wireframeMat);
    mesh1.rotation.x = Math.PI / 3;
    group.add(mesh1);

    // 2. Inner Concentric Financial Signal Ring (Electric green accent)
    const geom2 = new THREE.RingGeometry(1.6, 1.62, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00E676,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const mesh2 = new THREE.Mesh(geom2, ringMat);
    mesh2.rotation.x = Math.PI / 3;
    group.add(mesh2);

    // 3. Mathematical Probability Nodes (Floating points along wireframe perimeter)
    const nodeCount = 36;
    const nodeGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.1 + (Math.sin(i * 3) * 0.4);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.4;
      positions[i * 3 + 2] = Math.sin(angle * 2) * 0.5;
    }
    nodeGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x0A0A0A,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
    });
    const nodes = new THREE.Points(nodeGeom, nodeMat);
    group.add(nodes);

    // Position group slightly tilted down into the bottom of the hero
    group.position.y = -0.6;

    // Mouse parallax tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetRotX = (e.clientY / innerHeight - 0.5) * 0.35;
      targetRotY = (e.clientX / innerWidth - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Gentle continuous rotation
      mesh1.rotation.z = elapsedTime * 0.08;
      mesh2.rotation.z = -elapsedTime * 0.05;
      nodes.rotation.z = elapsedTime * 0.06;

      // Smooth mouse lerp
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geom1.dispose();
      geom2.dispose();
      nodeGeom.dispose();
      wireframeMat.dispose();
      ringMat.dispose();
      nodeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`${className} pointer-events-none select-none relative overflow-hidden`}
      aria-hidden="true"
    />
  );
}
