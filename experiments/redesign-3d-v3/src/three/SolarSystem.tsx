import * as THREE from 'three';
import { Stars } from '@react-three/drei';
import { PLANETS } from '../data/planets';
import { Planet } from './Planet';
import { usePlanets } from '../store';

/** Single warm sun shared by the custom surface shaders and the cloud layer. */
export const SUN_DIR = new THREE.Vector3(0.55, 0.32, 0.72).normalize();

/** The planetary system: starfield, sun light, and the seven project-planets. */
export function SolarSystem() {
  const quality = usePlanets((s) => s.quality);
  const starCount = quality === 'low' ? 700 : quality === 'medium' ? 1600 : 3200;
  return (
    <>
      <ambientLight intensity={0.14} />
      <directionalLight position={[SUN_DIR.x * 60, SUN_DIR.y * 60, SUN_DIR.z * 60]} intensity={1.1} />
      <Stars radius={130} depth={60} count={starCount} factor={4} saturation={0} fade speed={0.4} />
      {PLANETS.map((cfg) => (
        <Planet key={cfg.slug} config={cfg} />
      ))}
    </>
  );
}
