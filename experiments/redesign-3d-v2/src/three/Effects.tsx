import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { useWorlds } from '../store';

/**
 * Bloom chain via three's own post-processing passes (safe with three r170+):
 * RenderPass -> UnrealBloomPass (subtle, high threshold) -> OutputPass
 * (ACES tone mapping + sRGB). Vignette + grain are a cheap CSS overlay.
 */
export function Effects() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  const composer = useMemo(() => {
    const c = new EffectComposer(gl);
    c.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.5, // strength — restrained, not neon spam
      0.55, // radius
      0.8 // threshold — only the bright emissive bits bloom
    );
    c.addPass(bloom);
    c.addPass(new OutputPass());
    c.setPixelRatio(gl.getPixelRatio());
    c.setSize(size.width, size.height);
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera]);

  useEffect(() => {
    composer.setPixelRatio(gl.getPixelRatio());
    composer.setSize(size.width, size.height);
  }, [composer, gl, size]);

  useEffect(() => () => composer.dispose(), [composer]);

  // Priority > 0 takes over rendering from R3F's automatic loop.
  useFrame(() => {
    if (!useWorlds.getState().paused) composer.render();
  }, 1);

  return null;
}
