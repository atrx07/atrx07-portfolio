import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { SolarSystem } from './SolarSystem';
import { CameraRig } from './CameraRig';
import { usePlanets } from '../store';

/**
 * Fixed full-viewport 3D stage behind the DOM portfolio. Mounted only after
 * textures preload; the render loop pauses when the tab is hidden.
 */
export function Scene() {
  const texturesReady = usePlanets((s) => s.texturesReady);
  const setBooted = usePlanets((s) => s.setBooted);
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');

  useEffect(() => {
    const onVis = () => setFrameloop(document.hidden ? 'never' : 'always');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (!texturesReady) return;
    const t = setTimeout(setBooted, 450);
    return () => clearTimeout(t);
  }, [texturesReady, setBooted]);

  if (!texturesReady) return null;

  return (
    <div className="stage" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        frameloop={frameloop}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 42, near: 0.1, far: 500, position: [0, 1.4, 9.5] }}
        onPointerMissed={() => {
          const st = usePlanets.getState();
          if (st.selected) st.setSelected(null);
        }}
      >
        <AdaptiveDpr />
        <SolarSystem />
        <CameraRig />
      </Canvas>
    </div>
  );
}
