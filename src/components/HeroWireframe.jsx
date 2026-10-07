import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroWireframe({ className = "w-full h-full" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 900;
    let height = container.clientHeight || 750;

    const scene = new THREE.Scene();
    
    // Perspective camera with wide view and dynamic distance calculation
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Bounding radius for wireframe assembly
    const boundingRadius = 3.8;

    // Helper to calculate camera distance so nothing is ever clipped
    const updateCameraDistance = () => {
      const fovRad = (camera.fov * Math.PI) / 180;
      const aspect = Math.max(camera.aspect, 0.5);
      
      // Calculate distances required to fit both height and width with 25% safety margin
      const distH = (boundingRadius * 1.25) / Math.tan(fovRad / 2);
      const distW = (boundingRadius * 1.25) / (Math.tan(fovRad / 2) * aspect);
      
      const targetZ = Math.max(10.5, Math.max(distH, distW));
      camera.position.set(0, 0, targetZ);
      camera.updateProjectionMatrix();
    };

    updateCameraDistance();

    // 1. Curved Topological Torus Wireframe (Carefully sized to never clip)
    const torusGeom = new THREE.TorusGeometry(2.6, 0.85, 26, 76);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x1F2220,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const torusMesh = new THREE.Mesh(torusGeom, torusMat);
    torusMesh.rotation.x = Math.PI / 3.1;
    torusMesh.rotation.y = Math.PI / 6.2;
    mainGroup.add(torusMesh);

    // 2. Secondary Thin Neon Green Orbit Ring inside wireframe
    const ringGeom = new THREE.RingGeometry(1.95, 1.98, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00E676,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.70,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 3.1;
    ringMesh.rotation.y = Math.PI / 6.2;
    mainGroup.add(ringMesh);

    // 3. Floating Isometric Wireframe Prisms (Positioned safely within bounding sphere)
    const prismGroup = new THREE.Group();
    mainGroup.add(prismGroup);

    const boxGeom = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x181B19,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const prism1 = new THREE.Mesh(boxGeom, boxMat);
    prism1.position.set(-2.5, 1.4, -0.8);
    prism1.rotation.set(0.6, 0.8, 0.2);
    prismGroup.add(prism1);

    const prism2 = new THREE.Mesh(boxGeom, boxMat);
    prism2.position.set(2.6, -1.2, -0.6);
    prism2.rotation.set(0.4, 0.3, 0.9);
    prismGroup.add(prism2);

    const prism3 = new THREE.Mesh(boxGeom, boxMat);
    prism3.position.set(-2.2, -1.5, -0.9);
    prism3.rotation.set(0.9, 0.5, 0.3);
    prismGroup.add(prism3);

    // 4. Floating Neon Green Oracle Data Points (Safely constrained within bounding radius)
    const particleCount = 42;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.6 + (Math.sin(i * 3.5) * 0.4);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.45;
      positions[i * 3 + 2] = (Math.sin(i * 3) * 0.6) - 0.3;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00E676,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    mainGroup.add(particles);

    // 5. Fine Technical Crosshair Markers at Key Coordinates
    const crossGroup = new THREE.Group();
    mainGroup.add(crossGroup);
    const createCrosshair = (x, y, z) => {
      const crossPoints = [
        new THREE.Vector3(-0.08, 0, 0), new THREE.Vector3(0.08, 0, 0),
        new THREE.Vector3(0, -0.08, 0), new THREE.Vector3(0, 0.08, 0)
      ];
      const crossGeom = new THREE.BufferGeometry().setFromPoints(crossPoints);
      const crossMat = new THREE.LineBasicMaterial({ color: 0x00E676, transparent: true, opacity: 0.6 });
      const crossLines = new THREE.LineSegments(crossGeom, crossMat);
      crossLines.position.set(x, y, z);
      return crossLines;
    };
    crossGroup.add(createCrosshair(-2.2, 1.8, 0));
    crossGroup.add(createCrosshair(2.4, 1.6, 0));
    crossGroup.add(createCrosshair(1.9, -1.7, 0));

    // Mouse movement parallax
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 0.28;
      targetY = ((e.clientY / innerHeight) - 0.5) * -0.22;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth render loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Continuous subtle orbital rotation
      torusMesh.rotation.z = t * 0.045;
      ringMesh.rotation.z = -t * 0.038;
      particles.rotation.z = t * 0.04;

      prism1.rotation.x = 0.6 + t * 0.06;
      prism1.rotation.y = 0.8 + t * 0.08;

      prism2.rotation.x = 0.4 + t * 0.05;
      prism2.rotation.y = 0.3 + t * 0.07;

      prism3.rotation.x = 0.9 + t * 0.06;
      prism3.rotation.z = 0.3 + t * 0.05;

      // Mouse Parallax Lerp
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.04;
      mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.04;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 900;
      height = container.clientHeight || 750;
      camera.aspect = width / height;
      updateCameraDistance();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      torusGeom.dispose();
      ringGeom.dispose();
      boxGeom.dispose();
      particleGeom.dispose();
      torusMat.dispose();
      ringMat.dispose();
      boxMat.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`${className} pointer-events-none select-none relative flex items-center justify-center`}
      aria-hidden="true"
    />
  );
}
