import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * DataArchitecture3D
 * 
 * "3D DATA ARCHITECTURE" background engine.
 * STRICTLY NO: circles, concentric rings, orbital rings, floating dots, globes, cubes, or generic shapes.
 * 
 * ARCHITECTURAL ELEMENTS:
 * 1. Layered 3D Planes: Large semi-transparent glass/technical surfaces receding into deep z-space.
 * 2. Diagonal Data Rails: Thin architectural rails passing through 3D space with traveling energy pulses.
 * 3. 3D Grid Walls: Receding plane on left, vertical technical wall in deep background, angled substrate behind dashboard.
 * 4. Light Beams: Subtle vertical and diagonal volumetric beams with 5-15% opacity.
 * 5. Multi-layer Mouse Parallax: Far, mid, and near layers move at differing parallax rates.
 * 6. Dynamic Mode Shifts: Speed, pulses, and trajectory respond dynamically to the active tab:
 *    - 'trading': High-velocity green data rails, directional rush, sharp pulses.
 *    - 'analytics': Structured cyan/azure orthogonal grid scanning, horizontal data raster.
 *    - 'agents': Fluid flowing violet/cyan/emerald trails, adaptive branching paths.
 */
export default function DataArchitecture3D({ activeTab = 'agents' }) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    activeTab,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    scrollProgress: 1,
    isVisible: true,
  });

  // Keep stateRef synced with activeTab prop
  useEffect(() => {
    stateRef.current.activeTab = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050706, 0.0016);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 2000);
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ROOT HIERARCHY FOR PARALLAX
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const farGroup = new THREE.Group();
    const midGroup = new THREE.Group();
    const nearGroup = new THREE.Group();
    rootGroup.add(farGroup);
    rootGroup.add(midGroup);
    rootGroup.add(nearGroup);

    // ============================================================
    // 1. LAYERED 3D ARCHITECTURAL PLANES
    // ============================================================
    const planeMaterials = [];
    const planeBorderMaterials = [];

    // Helper to create an architectural glass plane with grid lines & technical borders
    const createArchitecturalPlane = ({
      w,
      h,
      x,
      y,
      z,
      rotX = 0,
      rotY = 0,
      rotZ = 0,
      fillColor = 0x0a1410,
      borderColor = 0x00e676,
      fillOpacity = 0.06,
      borderOpacity = 0.25,
      gridDivs = 8,
      parentGroup = midGroup,
    }) => {
      const planeGeo = new THREE.PlaneGeometry(w, h);
      
      const planeMat = new THREE.MeshBasicMaterial({
        color: fillColor,
        transparent: true,
        opacity: fillOpacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      planeMaterials.push(planeMat);

      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.position.set(x, y, z);
      planeMesh.rotation.set(rotX, rotY, rotZ);
      parentGroup.add(planeMesh);

      // Outer border frame
      const edgesGeo = new THREE.EdgesGeometry(planeGeo);
      const borderMat = new THREE.LineBasicMaterial({
        color: borderColor,
        transparent: true,
        opacity: borderOpacity,
        depthWrite: false,
      });
      planeBorderMaterials.push(borderMat);

      const borderLine = new THREE.LineSegments(edgesGeo, borderMat);
      planeMesh.add(borderLine);

      // Internal technical grid lines on plane
      if (gridDivs > 0) {
        const gridPoints = [];
        const stepX = w / gridDivs;
        const stepY = h / Math.round(gridDivs * (h / w));

        for (let gx = -w / 2; gx <= w / 2; gx += stepX) {
          gridPoints.push(new THREE.Vector3(gx, -h / 2, 0.1));
          gridPoints.push(new THREE.Vector3(gx, h / 2, 0.1));
        }
        for (let gy = -h / 2; gy <= h / 2; gy += stepY) {
          gridPoints.push(new THREE.Vector3(-w / 2, gy, 0.1));
          gridPoints.push(new THREE.Vector3(w / 2, gy, 0.1));
        }

        const gridLineGeo = new THREE.BufferGeometry().setFromPoints(gridPoints);
        const subGridMat = new THREE.LineBasicMaterial({
          color: borderColor,
          transparent: true,
          opacity: borderOpacity * 0.35,
          depthWrite: false,
        });
        planeBorderMaterials.push(subGridMat);

        const subGridMesh = new THREE.LineSegments(gridLineGeo, subGridMat);
        planeMesh.add(subGridMesh);
      }

      return planeMesh;
    };

    // PLANE 1: Deep Background Technical Surface (Far)
    createArchitecturalPlane({
      w: 240,
      h: 120,
      x: 0,
      y: 0,
      z: -420,
      fillColor: 0x05120d,
      borderColor: 0x00e676,
      fillOpacity: 0.08,
      borderOpacity: 0.22,
      gridDivs: 16,
      parentGroup: farGroup,
    });

    // PLANE 2: Left Receding Glass Panel (Mid)
    createArchitecturalPlane({
      w: 160,
      h: 95,
      x: -75,
      y: 8,
      z: -180,
      rotY: 0.55,
      rotX: -0.06,
      fillColor: 0x081814,
      borderColor: 0x00e676,
      fillOpacity: 0.07,
      borderOpacity: 0.28,
      gridDivs: 10,
      parentGroup: midGroup,
    });

    // PLANE 3: Right Mid Structural Panel (Mid)
    createArchitecturalPlane({
      w: 150,
      h: 90,
      x: 65,
      y: -6,
      z: -210,
      rotY: -0.48,
      rotX: 0.04,
      fillColor: 0x0a1622,
      borderColor: 0x38bdf8,
      fillOpacity: 0.06,
      borderOpacity: 0.24,
      gridDivs: 10,
      parentGroup: midGroup,
    });

    // PLANE 4: Angled Substrate Behind Dashboard (Near-Mid)
    createArchitecturalPlane({
      w: 175,
      h: 80,
      x: 0,
      y: -14,
      z: -70,
      rotX: 0.14,
      rotY: -0.02,
      fillColor: 0x040e0a,
      borderColor: 0x00e676,
      fillOpacity: 0.09,
      borderOpacity: 0.35,
      gridDivs: 12,
      parentGroup: midGroup,
    });

    // PLANE 5: Top Overhead Structural Flange (Near)
    createArchitecturalPlane({
      w: 180,
      h: 55,
      x: -15,
      y: 42,
      z: -90,
      rotX: -0.25,
      rotY: 0.1,
      fillColor: 0x061510,
      borderColor: 0x00e676,
      fillOpacity: 0.05,
      borderOpacity: 0.2,
      gridDivs: 8,
      parentGroup: nearGroup,
    });

    // ============================================================
    // 2. 3D GRID WALLS (Receding wireframes)
    // ============================================================
    const gridMaterials = [];

    // Receding Left Grid Wall
    const leftWallGrid = new THREE.GridHelper(160, 20, 0x00e676, 0x12241b);
    leftWallGrid.position.set(-82, 0, -180);
    leftWallGrid.rotation.set(0, 0, Math.PI / 2);
    leftWallGrid.rotation.y = 0.52;
    if (leftWallGrid.material) {
      leftWallGrid.material.transparent = true;
      leftWallGrid.material.opacity = 0.18;
      leftWallGrid.material.depthWrite = false;
      gridMaterials.push(leftWallGrid.material);
    }
    midGroup.add(leftWallGrid);

    // Deep Floor Substrate Grid
    const floorGrid = new THREE.GridHelper(260, 26, 0x00e676, 0x102118);
    floorGrid.position.set(0, -45, -240);
    if (floorGrid.material) {
      floorGrid.material.transparent = true;
      floorGrid.material.opacity = 0.16;
      floorGrid.material.depthWrite = false;
      gridMaterials.push(floorGrid.material);
    }
    farGroup.add(floorGrid);

    // ============================================================
    // 3. DIAGONAL DATA RAILS & FLOWING LIGHT PULSES
    // ============================================================
    // 4 major architectural rail vectors cutting diagonally through 3D space
    const railDefinitions = [
      {
        p1: new THREE.Vector3(-140, 65, -340),
        p2: new THREE.Vector3(120, -45, 20),
        speed: 0.0035,
        pulseCount: 5,
        pulseLen: 0.16,
      },
      {
        p1: new THREE.Vector3(-110, -55, -300),
        p2: new THREE.Vector3(135, 40, -40),
        speed: 0.0042,
        pulseCount: 4,
        pulseLen: 0.14,
      },
      {
        p1: new THREE.Vector3(130, 60, -320),
        p2: new THREE.Vector3(-110, -50, 10),
        speed: 0.003,
        pulseCount: 4,
        pulseLen: 0.18,
      },
      {
        p1: new THREE.Vector3(-150, 8, -260),
        p2: new THREE.Vector3(140, 22, -90),
        speed: 0.0028,
        pulseCount: 6,
        pulseLen: 0.12,
      },
    ];

    const railMaterials = [];
    const pulseObjects = [];

    railDefinitions.forEach((def, rIdx) => {
      // 1. Static structural rail track (double parallel architectural rail)
      const offset = new THREE.Vector3(0, 0.4, 0);
      const linePoints1 = [def.p1.clone().add(offset), def.p2.clone().add(offset)];
      const linePoints2 = [def.p1.clone().sub(offset), def.p2.clone().sub(offset)];

      const railGeo1 = new THREE.BufferGeometry().setFromPoints(linePoints1);
      const railGeo2 = new THREE.BufferGeometry().setFromPoints(linePoints2);

      const trackMat = new THREE.LineBasicMaterial({
        color: 0x00e676,
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
      });
      railMaterials.push(trackMat);

      midGroup.add(new THREE.Line(railGeo1, trackMat));
      midGroup.add(new THREE.Line(railGeo2, trackMat));

      // 2. Dynamic flowing pulses along rail
      for (let i = 0; i < def.pulseCount; i++) {
        const pulseGeo = new THREE.BufferGeometry();
        // 2-point line segment that slides
        const posArray = new Float32Array(6);
        pulseGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const pulseMat = new THREE.LineBasicMaterial({
          color: 0x00e676,
          transparent: true,
          opacity: 0.85,
          linewidth: 2,
          depthWrite: false,
        });

        const pulseMesh = new THREE.Line(pulseGeo, pulseMat);
        midGroup.add(pulseMesh);

        pulseObjects.push({
          mesh: pulseMesh,
          mat: pulseMat,
          rail: def,
          progress: i / def.pulseCount,
          len: def.pulseLen,
          speedMult: 1,
        });
      }
    });

    // ============================================================
    // 4. VOLUMETRIC LIGHT BEAMS (Subtle diagonal/vertical cuts)
    // ============================================================
    const beamMaterials = [];
    const beamMeshes = [];

    // Helper to generate soft gradient texture for light beams
    const createBeamTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0.7)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 256);
      return new THREE.CanvasTexture(canvas);
    };

    const beamTex = createBeamTexture();

    const beamConfigs = [
      { w: 14, h: 220, x: -45, y: 0, z: -160, rotZ: 0.28, rotX: 0.1, op: 0.08 },
      { w: 18, h: 240, x: 55, y: 10, z: -200, rotZ: -0.22, rotX: -0.08, op: 0.07 },
      { w: 10, h: 200, x: 8, y: -5, z: -110, rotZ: 0.12, rotX: 0.05, op: 0.09 },
      { w: 12, h: 210, x: -85, y: 15, z: -240, rotZ: 0.35, rotX: 0.15, op: 0.06 },
    ];

    beamConfigs.forEach((b) => {
      const bGeo = new THREE.PlaneGeometry(b.w, b.h);
      const bMat = new THREE.MeshBasicMaterial({
        color: 0x00e676,
        alphaMap: beamTex,
        transparent: true,
        opacity: b.op,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      beamMaterials.push(bMat);

      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(b.x, b.y, b.z);
      bMesh.rotation.set(b.rotX, 0, b.rotZ);
      farGroup.add(bMesh);

      beamMeshes.push({
        mesh: bMesh,
        baseRotZ: b.rotZ,
        phase: Math.random() * Math.PI * 2,
      });
    });

    // ============================================================
    // MOUSE TRACKING & PARALLAX
    // ============================================================
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.targetMouseX = Math.max(-1, Math.min(1, x));
      stateRef.current.targetMouseY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ============================================================
    // INTERSECTION OBSERVER FOR 60FPS IDLE OPTIMIZATION
    // ============================================================
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stateRef.current.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ============================================================
    // RESIZE LISTENER
    // ============================================================
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener('resize', handleResize);

    // ============================================================
    // ANIMATION LOOP (Adaptive mode states & smooth lerp)
    // ============================================================
    let animationFrameId;
    let clockTime = 0;

    // Target colors for mode transitions
    const targetColors = {
      trading: {
        accent: new THREE.Color(0x00e676), // High-frequency neon green
        border: new THREE.Color(0x00e676),
        fill: new THREE.Color(0x05160d),
        beam: new THREE.Color(0x00e676),
        speedMult: 2.4,
      },
      analytics: {
        accent: new THREE.Color(0x38bdf8), // Technical cyan / azure
        border: new THREE.Color(0x0284c7),
        fill: new THREE.Color(0x061424),
        beam: new THREE.Color(0x38bdf8),
        speedMult: 1.1,
      },
      agents: {
        accent: new THREE.Color(0x818cf8), // Fluid synaptic violet / cyan
        border: new THREE.Color(0x6366f1),
        fill: new THREE.Color(0x0c1126),
        beam: new THREE.Color(0x38bdf8),
        speedMult: 1.5,
      },
    };

    const currentColor = {
      accent: new THREE.Color(0x818cf8),
      border: new THREE.Color(0x6366f1),
      fill: new THREE.Color(0x0c1126),
      beam: new THREE.Color(0x38bdf8),
      speedMult: 1.5,
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!stateRef.current.isVisible) return;

      clockTime += 0.016;

      // 1. Smooth Mouse Lerp
      const s = stateRef.current;
      s.mouseX += (s.targetMouseX - s.mouseX) * 0.045;
      s.mouseY += (s.targetMouseY - s.mouseY) * 0.045;

      // 2. Parallax offsets across depth layers
      // Far layer moves slightly
      farGroup.position.x = s.mouseX * 6;
      farGroup.position.y = s.mouseY * 4;
      farGroup.rotation.y = s.mouseX * 0.02;

      // Mid layer moves moderately
      midGroup.position.x = s.mouseX * 14;
      midGroup.position.y = s.mouseY * 9;
      midGroup.rotation.y = s.mouseX * 0.04;
      midGroup.rotation.x = -s.mouseY * 0.03;

      // Near layer moves slightly stronger
      nearGroup.position.x = s.mouseX * 24;
      nearGroup.position.y = s.mouseY * 16;
      nearGroup.rotation.y = s.mouseX * 0.06;

      // 3. Dynamic Mode Transition Lerp
      const activeMode = s.activeTab || 'agents';
      const targetCfg = targetColors[activeMode] || targetColors.agents;

      currentColor.accent.lerp(targetCfg.accent, 0.06);
      currentColor.border.lerp(targetCfg.border, 0.06);
      currentColor.fill.lerp(targetCfg.fill, 0.06);
      currentColor.beam.lerp(targetCfg.beam, 0.06);
      currentColor.speedMult += (targetCfg.speedMult - currentColor.speedMult) * 0.06;

      // Apply colors to planes
      planeMaterials.forEach((m) => m.color.copy(currentColor.fill));
      planeBorderMaterials.forEach((m) => m.color.copy(currentColor.border));
      gridMaterials.forEach((m) => m.color.copy(currentColor.border));
      railMaterials.forEach((m) => m.color.copy(currentColor.border));
      beamMaterials.forEach((m) => m.color.copy(currentColor.beam));

      // 4. Advance Diagonal Rails Pulses
      pulseObjects.forEach((p) => {
        // Mode-dependent speed and pulsing
        p.progress += p.rail.speed * currentColor.speedMult;
        if (p.progress > 1) p.progress -= 1;

        const t1 = p.progress;
        const t2 = Math.min(1, p.progress + p.len);

        const v1 = new THREE.Vector3().lerpVectors(p.rail.p1, p.rail.p2, t1);
        const v2 = new THREE.Vector3().lerpVectors(p.rail.p1, p.rail.p2, t2);

        // Update positions
        const posAttr = p.mesh.geometry.attributes.position;
        posAttr.setXYZ(0, v1.x, v1.y, v1.z);
        posAttr.setXYZ(1, v2.x, v2.y, v2.z);
        posAttr.needsUpdate = true;

        p.mat.color.copy(currentColor.accent);
        
        // Mode-specific pulse intensity
        if (activeMode === 'trading') {
          // Sharper strobe
          p.mat.opacity = 0.6 + Math.sin(clockTime * 12 + p.progress * 10) * 0.38;
        } else if (activeMode === 'analytics') {
          // Steady linear flow
          p.mat.opacity = 0.55 + Math.sin(p.progress * Math.PI) * 0.35;
        } else {
          // AI Agents: Fluid breathing
          p.mat.opacity = 0.5 + Math.sin(clockTime * 3 + p.progress * 6) * 0.35;
        }
      });

      // 5. Light Beams Slow Ambient Sweep
      beamMeshes.forEach((bm) => {
        bm.mesh.rotation.z = bm.baseRotZ + Math.sin(clockTime * 0.5 + bm.phase) * 0.035;
        bm.mesh.position.y += Math.sin(clockTime * 0.3 + bm.phase) * 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ============================================================
    // CLEANUP
    // ============================================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      // Dispose Geometries and Materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    />
  );
}
