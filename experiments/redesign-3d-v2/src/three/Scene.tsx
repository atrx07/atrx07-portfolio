import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';
import {
  ContactWorld,
  EnvSetup,
  HeroCore,
  PrinciplesWorld,
  ProjectsWorld,
  SkillsWorld,
  Starfield,
} from './worlds';
import { useWorlds } from '../store';
import { dprFor } from '../lib/quality';

export default function Scene() {
  const quality = useWorlds((s) => s.quality);

  return (
    <Canvas
      dpr={dprFor(quality)}
      gl={{
        antialias: quality !== 'low',
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      camera={{ fov: 55, near: 0.1, far: 500, position: [0, 2.8, 16] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
    >
      <color attach="background" args={['#05070d']} />
      <fog attach="fog" args={['#05070d', 34, 120]} />
      <EnvSetup />
      <CameraRig />
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 14, 10]} intensity={1.1} color="#dfe9ff" />
      <directionalLight position={[-10, 6, -30]} intensity={0.4} color="#67e8f9" />
      <Starfield />
      <HeroCore />
      <ProjectsWorld />
      <SkillsWorld />
      <PrinciplesWorld />
      <ContactWorld />
      {quality !== 'low' && <Effects />}
    </Canvas>
  );
}
