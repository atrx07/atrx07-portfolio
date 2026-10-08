import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { projects } from '../../../../src/data/projects';
import { capabilityGroups, profile } from '../../../../src/data/profile';
import type { Project } from '../../../../src/types';
import { useWorlds } from '../store';
import { starCountFor } from '../lib/quality';

/* ------------------------------------------------------------------ */
/* Environment (procedural, no network HDR fetches)                    */
/* ------------------------------------------------------------------ */

export function EnvSetup() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const tex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = tex;
    return () => {
      scene.environment = null;
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ------------------------------------------------------------------ */
/* Starfield                                                           */
/* ------------------------------------------------------------------ */

export function Starfield() {
  const quality = useWorlds((s) => s.quality);
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => {
    const count = starCountFor(quality);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = ['#ffffff', '#9fd8ff', '#ffd9a8', '#c4b5fd'].map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 260;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 130 + 8;
      positions[i * 3 + 2] = 30 - Math.random() * 240;
      const c = palette[(Math.random() * palette.length) | 0];
      const b = 0.35 + Math.random() * 0.65;
      colors[i * 3] = c.r * b;
      colors[i * 3 + 1] = c.g * b;
      colors[i * 3 + 2] = c.b * b;
    }
    return { positions, colors };
  }, [quality]);

  useFrame((_, delta) => {
    const s = useWorlds.getState();
    if (s.paused || s.reducedMotion) return;
    ref.current.rotation.y += delta * 0.006;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — the memory lattice. A neural core with orbiting memory nodes  */
/* (local AI + bots with memory, the user's actual work — not gadgets). */
/* ------------------------------------------------------------------ */

const NODES = 14;
const CORE_Y = 0.8;

function PulseRings() {
  const g = useRef<THREE.Group>(null!);
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  useFrame((state) => {
    const s = useWorlds.getState();
    if (s.paused || s.reducedMotion) return;
    const t = state.clock.elapsedTime;
    g.current.children.forEach((child, i) => {
      const phase = (t * 0.32 + i / 2) % 1;
      const sc = 1 + phase * 5;
      child.scale.set(sc, sc, sc);
      const m = mats.current[i];
      if (m) m.opacity = 0.5 * (1 - phase);
    });
  });
  return (
    <group ref={g} position={[0, CORE_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {[0, 1].map((i) => (
        <mesh key={i}>
          <torusGeometry args={[1.9, 0.02, 8, 96]} />
          <meshBasicMaterial
            ref={(m) => {
              mats.current[i] = m;
            }}
            color="#22d3ee"
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroCore() {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const wire = useRef<THREE.Mesh>(null!);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const params = useMemo(
    () =>
      Array.from({ length: NODES }, (_, i) => {
        const ring = i % 3;
        return {
          radius: 2.9 + ring * 1.15,
          speed: (0.24 + (i % 4) * 0.055) * (ring % 2 === 0 ? 1 : -1),
          phase: (i / NODES) * Math.PI * 2,
          lift: (ring - 1) * 0.55,
        };
      }),
    []
  );
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NODES * 2 * 3), 3));
    return g;
  }, []);
  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  const layout = (t: number) => {
    const pos = lineGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < NODES; i++) {
      const prm = params[i];
      const a = prm.phase + t * prm.speed;
      const x = Math.cos(a) * prm.radius;
      const z = Math.sin(a) * prm.radius * 0.72;
      const y = CORE_Y + Math.sin(a * 1.6 + prm.phase) * 0.55 + prm.lift * 0.5;
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      pos.setXYZ(i * 2, 0, CORE_Y, 0);
      pos.setXYZ(i * 2 + 1, x, y, z);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    pos.needsUpdate = true;
  };

  useLayoutEffect(() => {
    layout(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    const s = useWorlds.getState();
    const t = state.clock.elapsedTime;
    if (!s.paused && !s.reducedMotion) {
      layout(t);
      wire.current.rotation.y = -t * 0.08;
      wire.current.rotation.x = t * 0.04;
    }
    // Easter egg: signal mode makes the core cycle the spectrum.
    if (s.signalMode) coreMat.current.emissive.setHSL((t * 0.25) % 1, 0.95, 0.6);
    else coreMat.current.emissive.set('#22d3ee');
  });

  return (
    <group>
      <mesh position={[0, CORE_Y, 0]}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          ref={coreMat}
          color="#062a33"
          emissive="#22d3ee"
          emissiveIntensity={1.35}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <mesh ref={wire} position={[0, CORE_Y, 0]}>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.26} />
      </mesh>
      {[2.9, 4.05, 5.2].map((r, i) => (
        <mesh
          key={r}
          position={[0, CORE_Y + (i - 1) * 0.28, 0]}
          rotation={[Math.PI / 2.15, 0, 0]}
        >
          <torusGeometry args={[r, 0.012, 8, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.22} />
        </mesh>
      ))}
      <instancedMesh ref={mesh} args={[undefined, undefined, NODES]} frustumCulled={false}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#0b1220" emissive="#a5f3fc" emissiveIntensity={2.2} />
      </instancedMesh>
      <lineSegments geometry={lineGeo} frustumCulled={false}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.3} />
      </lineSegments>
      <PulseRings />
      <pointLight position={[0, CORE_Y, 0]} color="#22d3ee" intensity={60} distance={24} decay={2} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Projects — each featured project is a planet you can click.         */
/* ------------------------------------------------------------------ */

type PlanetKind = 'torus' | 'ico' | 'sphere' | 'knot' | 'box' | 'octa' | 'capsule';

const VISUAL: Record<Project['visual'], { color: string; kind: PlanetKind }> = {
  telemetry: { color: '#22d3ee', kind: 'torus' },
  runtime: { color: '#a78bfa', kind: 'ico' },
  chat: { color: '#34d399', kind: 'sphere' },
  memory: { color: '#f472b6', kind: 'knot' },
  sequencer: { color: '#fbbf24', kind: 'box' },
  security: { color: '#f87171', kind: 'octa' },
  mobile: { color: '#60a5fa', kind: 'capsule' },
};

function PlanetGeo({ kind }: { kind: PlanetKind }) {
  switch (kind) {
    case 'torus':
      return <torusGeometry args={[1.05, 0.34, 18, 42]} />;
    case 'ico':
      return <icosahedronGeometry args={[1.35, 0]} />;
    case 'sphere':
      return <sphereGeometry args={[1.25, 40, 40]} />;
    case 'knot':
      return <torusKnotGeometry args={[0.85, 0.3, 120, 18]} />;
    case 'box':
      return <boxGeometry args={[1.9, 1.9, 1.9]} />;
    case 'octa':
      return <octahedronGeometry args={[1.45, 0]} />;
    case 'capsule':
      return <capsuleGeometry args={[0.8, 1.3, 8, 20]} />;
  }
}

function cursorLabel(text: string | null) {
  window.dispatchEvent(new CustomEvent('atrx-cursor', { detail: text }));
}

function Planet({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const setSelectedProject = useWorlds((s) => s.setSelectedProject);
  const markOpened = useWorlds((s) => s.markOpened);
  const reduced = useWorlds((s) => s.reducedMotion);
  const mesh = useRef<THREE.Mesh>(null!);
  const v = VISUAL[project.visual];
  const x = (index - 3) * 6.4;
  const y = 1.7 + Math.sin(index * 1.7) * 1.1;
  const z = -22 + Math.cos(index * 0.9) * 2.5;

  useFrame((_, delta) => {
    const s = useWorlds.getState();
    if (s.paused || s.reducedMotion) return;
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x += delta * 0.08;
  });

  const open = () => {
    setSelectedProject(project.slug);
    markOpened(project.slug);
  };

  return (
    <group position={[x, y, z]}>
      <Float speed={reduced ? 0 : 2.2} rotationIntensity={0.25} floatIntensity={1.4}>
        <mesh
          ref={mesh}
          scale={hovered ? 1.22 : 1}
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            cursorLabel('OPEN');
          }}
          onPointerOut={() => {
            setHovered(false);
            cursorLabel(null);
          }}
        >
          <PlanetGeo kind={v.kind} />
          <meshStandardMaterial
            color="#0a0f16"
            emissive={v.color}
            emissiveIntensity={hovered ? 1.5 : 0.8}
            roughness={0.35}
            metalness={0.15}
          />
        </mesh>
      </Float>
      <Html position={[0, 2.7, 0]} center distanceFactor={16} zIndexRange={[20, 0]}>
        <button
          type="button"
          className="world-tag"
          data-hover
          onClick={open}
          style={{ '--tag': v.color } as CSSProperties}
        >
          <span className="world-tag-dot" />
          {project.name}
        </button>
      </Html>
    </group>
  );
}

export function ProjectsWorld() {
  return (
    <group>
      {projects
        .filter((p) => p.featured)
        .map((p, i) => (
          <Planet key={p.slug} project={p} index={i} />
        ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Skills — interactive orbs, one per capability group.                */
/* ------------------------------------------------------------------ */

const ORB_COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'];
const ORB_SHORT = ['Native & local AI', 'Interfaces', 'Automation & bots', 'Real-time & cloud', 'Hardware & media'];

function SkillOrb({ index }: { index: number }) {
  const selected = useWorlds((s) => s.selectedSkill === index);
  const setSelectedSkill = useWorlds((s) => s.setSelectedSkill);
  const reduced = useWorlds((s) => s.reducedMotion);
  const color = ORB_COLORS[index % ORB_COLORS.length];
  const x = (index - 2) * 6.2;
  const toggle = () => setSelectedSkill(selected ? null : index);

  return (
    <group position={[x, 1.6, -44]}>
      <Float speed={reduced ? 0 : 2.6} floatIntensity={1.8} rotationIntensity={0.3}>
        <mesh
          scale={selected ? 1.35 : 1}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            cursorLabel('VIEW');
          }}
          onPointerOut={() => cursorLabel(null)}
        >
          <sphereGeometry args={[1.15, 40, 40]} />
          <meshStandardMaterial
            color="#0a0f16"
            emissive={color}
            emissiveIntensity={selected ? 1.9 : 0.9}
            roughness={0.25}
            metalness={0.2}
          />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[1.7, 0.02, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <Html position={[0, 2.4, 0]} center distanceFactor={16} zIndexRange={[20, 0]}>
        <button
          type="button"
          className="world-tag"
          data-hover
          onClick={toggle}
          style={{ '--tag': color } as CSSProperties}
        >
          <span className="world-tag-dot" />
          {ORB_SHORT[index] ?? capabilityGroups[index].title}
        </button>
      </Html>
    </group>
  );
}

export function SkillsWorld() {
  return (
    <group>
      {capabilityGroups.map((_, i) => (
        <SkillOrb key={i} index={i} />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Principles — beacon pillars; the copy lives in the DOM chapter.     */
/* ------------------------------------------------------------------ */

export function PrinciplesWorld() {
  const reduced = useWorlds((s) => s.reducedMotion);
  return (
    <group>
      {profile.principles.map((_, i) => {
        const x = (i - 1.5) * 6.5;
        const color = i % 2 === 0 ? '#22d3ee' : '#a78bfa';
        return (
          <group key={i} position={[x, 0, -66]}>
            <mesh position={[0, 2.5, 0]}>
              <boxGeometry args={[0.55, 5, 0.55]} />
              <meshStandardMaterial
                color="#0a0f16"
                emissive={color}
                emissiveIntensity={1.1}
                roughness={0.4}
              />
            </mesh>
            <Float speed={reduced ? 0 : 3} floatIntensity={2.2} rotationIntensity={0.6}>
              <mesh position={[0, 5.9, 0]}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                  color="#0a0f16"
                  emissive={color}
                  emissiveIntensity={2}
                  roughness={0.3}
                />
              </mesh>
            </Float>
            <pointLight position={[0, 5.9, 0]} color={color} intensity={14} distance={10} decay={2} />
          </group>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — the transmission beacon.                                  */
/* ------------------------------------------------------------------ */

function BeaconRings() {
  const g = useRef<THREE.Group>(null!);
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  useFrame((state) => {
    const s = useWorlds.getState();
    if (s.paused || s.reducedMotion) return;
    const t = state.clock.elapsedTime;
    g.current.children.forEach((child, i) => {
      const phase = (t * 0.4 + i / 3) % 1;
      child.position.y = phase * 8;
      const sc = 0.6 + phase * 2.2;
      child.scale.set(sc, sc, sc);
      const m = mats.current[i];
      if (m) m.opacity = 0.55 * (1 - phase);
    });
  });
  return (
    <group ref={g} position={[0, 0, -88]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.03, 8, 64]} />
          <meshBasicMaterial
            ref={(m) => {
              mats.current[i] = m;
            }}
            color="#a78bfa"
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function BeaconParticles() {
  const COUNT = 130;
  const ref = useRef<THREE.Points>(null!);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.random() * 2.4;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = -88 + Math.sin(a) * r;
      speeds[i] = 0.6 + Math.random() * 1.4;
    }
    return { positions, speeds };
  }, []);
  useFrame((_, delta) => {
    const s = useWorlds.getState();
    if (s.paused || s.reducedMotion) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const d = Math.min(delta, 0.05);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * d;
      if (arr[i * 3 + 1] > 8.5) arr[i * 3 + 1] = 0;
    }
    attr.needsUpdate = true;
  });
  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        color="#c4b5fd"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export function ContactWorld() {
  return (
    <group>
      <mesh position={[0, 3.5, -88]}>
        <cylinderGeometry args={[0.45, 0.85, 7, 24]} />
        <meshStandardMaterial
          color="#0a0f16"
          emissive="#a78bfa"
          emissiveIntensity={1.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.08, -88]}>
        <cylinderGeometry args={[2.4, 2.4, 0.16, 48]} />
        <meshStandardMaterial
          color="#0b1220"
          emissive="#a78bfa"
          emissiveIntensity={0.35}
          roughness={0.6}
        />
      </mesh>
      <BeaconRings />
      <BeaconParticles />
      <pointLight position={[0, 4, -88]} color="#a78bfa" intensity={80} distance={26} decay={2} />
    </group>
  );
}
