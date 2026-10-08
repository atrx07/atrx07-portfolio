import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetConfig } from '../data/planets';
import { getLoaded } from './textures';
import { SUN_DIR } from './SolarSystem';
import { ATMO_FRAG, ATMO_VERT, LAVA_FRAG, SURFACE_FRAG, SURFACE_VERT } from './shaders';
import { usePlanets } from '../store';

/**
 * One reusable realistic planet: custom terminator-blend surface shader,
 * fresnel atmosphere shell, independent cloud layer, optional ring system.
 * Interaction lives on the SURFACE mesh only — shells use raycast={() => null}
 * so they never steal hits. Hover highlight mutates a shader uniform in the
 * loop (no React re-renders); clicks write selection once to the zustand store.
 */
export function Planet({ config }: { config: PlanetConfig }) {
  const { slug, radius } = config;
  const quality = usePlanets((s) => s.quality);
  const setHovered = usePlanets((s) => s.setHovered);
  const setSelected = usePlanets((s) => s.setSelected);
  const markOpened = usePlanets((s) => s.markOpened);

  const spin = useRef<THREE.Group>(null);
  const clouds = useRef<THREE.Mesh>(null);
  const surfaceMat = useRef<THREE.ShaderMaterial>(null);

  const tex = getLoaded(slug);
  if (!tex) throw new Error(`Planet "${slug}": textures not preloaded`);

  const uniforms = useMemo(
    () => ({
      uDayMap: { value: tex.day },
      uNightMap: { value: tex.night ?? tex.day },
      uHasNight: { value: tex.night ? 1 : 0 },
      uSunDir: { value: SUN_DIR.clone() },
      uHighlight: { value: 0 },
      uAccent: { value: new THREE.Color(config.accent) },
      uTime: { value: Math.random() * 100 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug],
  );

  const atmoUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(config.atmosphere) },
      uPower: { value: 3.2 },
      uIntensity: { value: config.atmosphereIntensity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug],
  );

  const ringGeo = useMemo(() => {
    if (!config.ring) return null;
    const { inner, outer } = config.ring;
    const g = new THREE.RingGeometry(inner, outer, 128, 1);
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = (v.length() - inner) / (outer - inner);
      uv.setXY(i, t, 1);
    }
    uv.needsUpdate = true;
    return g;
  }, [config.ring]);

  const low = quality === 'low';
  const frag = config.kind === 'lava' ? LAVA_FRAG : SURFACE_FRAG;

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const st = usePlanets.getState();
    if (!st.paused) {
      if (spin.current) spin.current.rotation.y += config.rotationSpeed * dt;
      if (clouds.current) clouds.current.rotation.y += (config.rotationSpeed + config.cloudSpeed) * dt;
    }
    const m = surfaceMat.current;
    if (m) {
      const target =
        st.hovered === slug ? 1 : st.signalMode ? 0.45 + 0.4 * Math.sin(performance.now() / 240) : 0;
      const u = m.uniforms.uHighlight as { value: number };
      u.value += (target - u.value) * Math.min(1, dt * 8);
      (m.uniforms.uTime as { value: number }).value += dt;
    }
  });

  const select = () => {
    markOpened(slug);
    setSelected(slug);
  };

  return (
    <group position={config.position}>
      {/* Rotating inner group: surface + clouds spin, labels stay put. */}
      <group ref={spin}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            select();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(slug);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(null);
            document.body.style.cursor = '';
          }}
        >
          <sphereGeometry args={[radius, 64, 64]} />
          <shaderMaterial
            ref={surfaceMat}
            args={[{ uniforms, vertexShader: SURFACE_VERT, fragmentShader: frag }]}
          />
        </mesh>
        {tex.clouds && !low && config.kind !== 'lava' && (
          <mesh ref={clouds} scale={radius * 1.015} raycast={() => null}>
            <sphereGeometry args={[1, 48, 48]} />
            <meshLambertMaterial map={tex.clouds} transparent depthWrite={false} opacity={0.85} />
          </mesh>
        )}
      </group>

      {!low && (
        <mesh scale={radius * 1.18} raycast={() => null}>
          <sphereGeometry args={[1, 48, 48]} />
          <shaderMaterial
            args={[{ uniforms: atmoUniforms, vertexShader: ATMO_VERT, fragmentShader: ATMO_FRAG }]}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            transparent
            depthWrite={false}
          />
        </mesh>
      )}

      {config.ring && tex.ring && ringGeo && (
        <mesh
          geometry={ringGeo}
          rotation={[-Math.PI / 2 + config.ring.tilt, 0, 0.3]}
          raycast={() => null}
        >
          <meshBasicMaterial
            map={tex.ring}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
            opacity={0.95}
          />
        </mesh>
      )}

      <Html
        position={[0, radius * 1.7, 0]}
        center
        distanceFactor={30}
        occlude="raycast"
        zIndexRange={[30, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <button
          className="planet-label"
          onClick={select}
          style={{ ['--accent' as string]: config.accent }}
          aria-label={`Open ${config.name} dossier`}
        >
          <span className="planet-label-dot" />
          {config.name}
        </button>
      </Html>
    </group>
  );
}
