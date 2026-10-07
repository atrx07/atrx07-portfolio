import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type Props = { variant?: 'assembly' | 'phone' | 'core'; exploded?: boolean; reduced: boolean; paused: boolean; onReady?: () => void; onSelect?: (slug: string) => void };

function screenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 1024;
  const c = canvas.getContext('2d')!;
  c.fillStyle = '#0d1720'; c.fillRect(0, 0, 512, 1024);
  c.strokeStyle = '#253441'; c.lineWidth = 1;
  for (let x = 0; x < 512; x += 32) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1024); c.stroke(); }
  for (let y = 0; y < 1024; y += 32) { c.beginPath(); c.moveTo(0, y); c.lineTo(512, y); c.stroke(); }
  c.fillStyle = '#eef3f7'; c.font = '500 22px sans-serif'; c.fillText('TRAELYX', 36, 74);
  c.fillStyle = '#a3acb5'; c.font = '18px sans-serif'; c.fillText('OFFLINE ROUTE REPLAY', 36, 116);
  c.strokeStyle = '#006dff'; c.lineWidth = 12; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath(); c.moveTo(120, 700); c.lineTo(120, 560); c.quadraticCurveTo(120, 520, 165, 520);
  c.lineTo(340, 520); c.quadraticCurveTo(385, 520, 385, 475); c.lineTo(385, 300);
  c.quadraticCurveTo(385, 260, 340, 260); c.lineTo(250, 260); c.stroke();
  c.fillStyle = '#b0d0ff'; c.beginPath(); c.arc(250, 260, 17, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#567ca7'; c.lineWidth = 2; c.beginPath(); c.arc(250, 260, 36, 0, Math.PI * 2); c.stroke();
  c.fillStyle = '#a7b2bc'; c.font = '18px sans-serif'; c.fillText('SCHEMATIC / SYNTHETIC ROUTE', 36, 805);
  c.fillStyle = '#eef3f7'; c.font = '34px sans-serif'; c.fillText('The drive stays yours.', 36, 900);
  c.fillStyle = '#006dff'; c.fillRect(36, 944, 440, 5);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function Scene({ variant = 'assembly', exploded = false, reduced, paused, onReady, onSelect }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef({ exploded, reduced, paused });
  controls.current = { exploded, reduced, paused };
  const readyCallback = useRef(onReady); readyCallback.current = onReady;
  const selectCallback = useRef(onSelect); selectCallback.current = onSelect;
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [near, setNear] = useState(variant === 'assembly');

  useEffect(() => {
    if (near) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setNear(true); observer.disconnect(); } }, { rootMargin: '200px' });
    observer.observe(host.current!); return () => observer.disconnect();
  }, [near]);

  useEffect(() => {
    if (!near) return;
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' }); }
    catch { setFailed(true); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1, 12); camera.lookAt(0, 0, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = new RoomEnvironment();
    const env = pmrem.fromScene(environment, 0.04); scene.environment = env.texture;
    const resources: THREE.Texture[] = [];
    const silver = new THREE.MeshStandardMaterial({ color: '#c1c7d0', metalness: 1, roughness: 0.24 });
    const chrome = new THREE.MeshStandardMaterial({ color: '#e8edf4', metalness: 1, roughness: 0.09 });
    const black = new THREE.MeshStandardMaterial({ color: '#121923', metalness: 0.8, roughness: 0.32 });
    const ceramic = new THREE.MeshStandardMaterial({ color: '#e9eced', metalness: 0.3, roughness: 0.3 });
    const blue = new THREE.MeshPhysicalMaterial({ color: '#004bf5', metalness: 0.5, roughness: 0.18, clearcoat: 1 });
    const signal = new THREE.MeshStandardMaterial({ color: '#136cff', emissive: '#075cff', emissiveIntensity: 2.2 });
    const group = new THREE.Group(); scene.add(group);
    const parts: { object: THREE.Object3D; from: THREE.Vector3; to: THREE.Vector3; axis?: 'x' | 'y'; rotation: THREE.Euler }[] = [];
    function box(w: number, h: number, d: number, material: THREE.Material, radius = 0.1) {
      return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, radius), material);
    }
    function addPart(object: THREE.Object3D, from: number[], to: number[], axis?: 'x' | 'y') {
      object.position.set(from[0], from[1], from[2]); group.add(object);
      parts.push({ object, from: object.position.clone(), to: new THREE.Vector3(...to), axis, rotation: object.rotation.clone() });
    }
    function makeRing() {
      const g = new THREE.Group();
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.26, 24, 96), chrome); g.add(ring);
      const band = new THREE.Mesh(new THREE.TorusGeometry(1.36, 0.08, 12, 96), black); band.position.z = 0.25; g.add(band);
      const inner = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.022, 8, 96), signal); inner.position.z = 0.16; g.add(inner);
      for (let i = 0; i < 40; i++) {
        const a = i / 40 * Math.PI * 2;
        const tick = box(0.023, 0.14, 0.02, i % 5 === 0 ? black : silver, 0.01);
        tick.position.set(Math.sin(a) * 1.36, Math.cos(a) * 1.36, 0.27); tick.rotation.z = -a; g.add(tick);
      }
      const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.68, 5), blue); g.add(sphere);
      const coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.77, 0.025, 8, 72), ceramic);
      coreRing.rotation.x = 1.1; coreRing.rotation.y = 0.4; g.add(coreRing);
      g.rotation.set(-0.35, -0.4, -0.25); return g;
    }
    function makeCore() {
      const g = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        const layer = box(1.65, 0.24, 1.65, i === 2 ? blue : i === 3 ? black : silver, 0.07);
        layer.position.y = i * 0.36; g.add(layer);
        for (let j = 0; j < 8; j++) {
          const fin = box(0.1, 0.12, 1.4, black, 0.02); fin.position.set(-0.62 + j * 0.18, i * 0.36 + 0.13, 0); g.add(fin);
        }
        const stripe = box(1.05, 0.024, 0.02, signal, 0.01); stripe.position.set(0, i * 0.36, 0.833); g.add(stripe);
      }
      const chip = box(0.65, 0.025, 0.65, chrome, 0.03); chip.position.y = 1.24; g.add(chip);
      g.rotation.set(0.2, -0.6, 0.1); return g;
    }
    function makePhone() {
      const g = new THREE.Group();
      const frame = box(1.55, 3.04, 0.2, chrome, 0.18); g.add(frame);
      const bezel = box(1.48, 2.97, 0.21, black, 0.15); g.add(bezel);
      const texture = screenTexture(); resources.push(texture);
      const display = new THREE.Mesh(new THREE.PlaneGeometry(1.34, 2.68), new THREE.MeshBasicMaterial({ map: texture }));
      display.position.z = 0.115; g.add(display);
      const cameraHole = box(0.3, 0.08, 0.035, black, 0.04); cameraHole.position.set(0, 1.37, 0.13); g.add(cameraHole);
      const side = box(0.04, 0.4, 0.06, silver, 0.015); side.position.set(0.795, 0.55, 0); g.add(side);
      g.rotation.set(-0.1, -0.25, 0.12); return g;
    }
    function makeSatellite() {
      const g = new THREE.Group();
      const cube = box(0.8, 0.8, 0.8, ceramic, 0.12); g.add(cube);
      for (let i = 0; i < 3; i++) {
        const slot = box(0.52, 0.035, 0.04, i === 1 ? signal : black, 0.015);
        slot.position.set(0, -0.16 + i * 0.16, 0.41); g.add(slot);
      }
      g.rotation.set(0.25, 0.4, -0.2); return g;
    }
    if (variant === 'assembly') {
      const ring = makeRing(); ring.userData.project = 'neuraloc';
      addPart(ring, [0, 0.15, 0.1], [-0.25, 0.5, 0.1], 'y');
      const phone = makePhone(); phone.scale.setScalar(0.6); phone.userData.project = 'traelyx';
      addPart(phone, [1.9, 0.15, -0.5], [2.6, 0.55, 0.4]);
      const core = makeCore(); core.scale.setScalar(0.85); core.userData.project = 'neuraloc';
      addPart(core, [-1.95, -0.35, -0.2], [-2.7, -0.15, -0.15]);
      const satellite = makeSatellite(); satellite.userData.project = 'voidchat';
      addPart(satellite, [0.65, -1.38, 0.6], [0.8, -1.65, 1.1], 'y');
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.012, 6, 128), silver);
      orbit.rotation.set(1.18, 0.15, -0.22); addPart(orbit, [0, 0, -0.5], [0, -0.2, -0.5]);
      for (let i = 0; i < 3; i++) {
        const bead = new THREE.Mesh(new THREE.SphereGeometry(0.12 + i * 0.035, 20, 20), i === 1 ? signal : chrome);
        addPart(bead, [-0.8 + i, 1.55 + (i % 2) * 0.3, 0], [-1.15 + i * 1.2, 1.85, 0.5]);
      }
    } else if (variant === 'phone') {
      const phone = makePhone(); phone.scale.setScalar(1.32);
      addPart(phone, [0, 0, 0], [-0.2, 0.1, 0.3]);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2, 0.014, 8, 128), silver);
      ring.rotation.set(0.6, 0.3, 0.2); addPart(ring, [0, 0, -1], [0, 0, -1]);
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), blue);
      addPart(marker, [1.9, 0.5, 0.2], [2.3, 0.7, 0.2]);
    } else {
      const core = makeCore(); core.scale.setScalar(1.65); core.position.y = -0.7;
      addPart(core, [0, -0.7, 0], [0, -1, 0]);
      const lid = box(2.7, 0.16, 2.7, ceramic, 0.1); lid.rotation.y = -0.6;
      addPart(lid, [0, 1.7, 0], [0, 2.5, 0]);
      const halo = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.018, 8, 128), signal);
      halo.rotation.x = Math.PI / 2; addPart(halo, [0, 1.25, 0], [0, 1.65, 0]);
    }
    scene.add(new THREE.AmbientLight('#f3f5ff', 0.8));
    const light = new THREE.DirectionalLight('#ffffff', 3); light.position.set(4, 5, 4); scene.add(light);
    const rim = new THREE.DirectionalLight('#a2baff', 2); rim.position.set(-3, 1, -3); scene.add(rim);
    const pointer = new THREE.Vector2();
    let dragging = false, lastX = 0, startX = 0, startY = 0, rotation = 0, visible = true, frame = 0, lastTime = 0, spread = 0, announced = false, dirty = true, lastMode = '';
    const raycaster = new THREE.Raycaster();
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width - 0.5) * 2, ((event.clientY - rect.top) / rect.height - 0.5) * 2);
      if (dragging) { rotation += (event.clientX - lastX) * 0.006; lastX = event.clientX; }
    };
    const down = (event: PointerEvent) => { startX = event.clientX; startY = event.clientY; if (event.pointerType === 'touch') return; dragging = true; lastX = event.clientX; el.setPointerCapture(event.pointerId); };
    const up = (event: PointerEvent) => {
      dragging = false;
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 6 || !selectCallback.current) return;
      const rect = el.getBoundingClientRect();
      raycaster.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), camera);
      for (const hit of raycaster.intersectObjects(group.children, true)) {
        let object: THREE.Object3D | null = hit.object;
        while (object && !object.userData.project) object = object.parent;
        if (object?.userData.project) { selectCallback.current(object.userData.project); break; }
      }
    };
    const cancel = () => { dragging = false; };
    const leave = () => { if (!dragging) pointer.set(0, 0); };
    const reset = () => { rotation = 0; pointer.set(0, 0); };
    const lost = (event: Event) => { event.preventDefault(); setFailed(true); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', cancel); el.addEventListener('pointerleave', leave);
    el.addEventListener('scene-reset', reset); renderer.domElement.addEventListener('webglcontextlost', lost);
    const resize = new ResizeObserver(() => {
      const width = el.clientWidth, height = el.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height); camera.aspect = width / height; dirty = true;
      camera.position.z = variant === 'assembly' ? (width < 600 ? 13 : 8.7) : width < 600 ? 12 : 10;
      camera.updateProjectionMatrix();
    }); resize.observe(el);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: '120px' }); observer.observe(el);
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      if (!visible || document.hidden || now - lastTime < (window.innerWidth < 600 ? 32 : 16)) return;
      const delta = Math.min((now - lastTime) / 1000, 0.05); lastTime = now;
      const { reduced: staticMotion, paused: stopped, exploded: open } = controls.current;
      const mode = `${staticMotion}/${stopped}/${open}`;
      if (mode !== lastMode) { lastMode = mode; dirty = true; }
      if ((staticMotion || stopped) && !dirty && Math.abs(spread - (open ? 1 : 0)) < 0.002) return;
      spread = THREE.MathUtils.damp(spread, open ? 1 : 0, staticMotion ? 100 : 4, delta);
      group.rotation.y = THREE.MathUtils.damp(group.rotation.y, staticMotion || stopped ? 0 : rotation + pointer.x * 0.15, 5, delta);
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, staticMotion || stopped ? 0 : pointer.y * 0.07, 5, delta);
      parts.forEach(({ object, from, to, axis, rotation: restingRotation }, index) => {
        object.position.lerpVectors(from, to, spread);
        if (!staticMotion && !stopped) object.position.y += Math.sin(now * 0.00065 + index) * 0.055;
        if (axis) object.rotation[axis] = restingRotation[axis] + (!staticMotion && !stopped ? Math.sin(now * 0.00025 + index) * 0.13 : 0);
      });
      renderer.render(scene, camera);
      dirty = false;
      if (!announced) { announced = true; setReady(true); readyCallback.current?.(); }
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      el.removeEventListener('pointermove', move); el.removeEventListener('pointerdown', down); el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', cancel); el.removeEventListener('pointerleave', leave); el.removeEventListener('scene-reset', reset);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => materials.add(m)); } });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); resources.forEach(t => t.dispose());
      env.dispose(); environment.dispose(); pmrem.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, [variant, near]);

  return <div ref={host} className={`scene scene--${variant} ${ready ? 'is-ready' : ''} ${failed ? 'has-failed' : ''}`} aria-label={variant === 'phone' ? 'Illustrated Traelyx device with a synthetic route' : variant === 'core' ? 'Illustrated local compute layers' : 'Interactive assembly of original software-inspired instruments'}>
    <div className="scene-poster" aria-hidden="true"><div className="poster-orbit"><div className="poster-core" /></div><span className="poster-chip" /><span className="poster-phone" /></div>
    {failed && <span className="scene-fallback-note">Still view · all project information is available below</span>}
  </div>;
}
