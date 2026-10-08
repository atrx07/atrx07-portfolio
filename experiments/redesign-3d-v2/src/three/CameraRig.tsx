import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { sampleWaypoints, WAYPOINTS } from '../lib/camera';
import { useWorlds } from '../store';

/**
 * Single scroll-driven camera rig. Scroll progress 0..1 is written
 * imperatively into the store; every frame we damp toward it and lerp
 * between authored waypoints. No OrbitControls in production.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const smooth = useRef(0);
  const lookCur = useRef(new THREE.Vector3(...WAYPOINTS[0].look));
  const tmpPos = useMemo(() => new THREE.Vector3(), []);
  const tmpLook = useMemo(() => new THREE.Vector3(), []);

  useLayoutEffect(() => {
    const pose = sampleWaypoints(0);
    camera.position.set(...pose.pos);
    lookCur.current.set(...pose.look);
    camera.lookAt(lookCur.current);
    camera.fov = pose.fov;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame((state, delta) => {
    const s = useWorlds.getState();
    const d = Math.min(delta, 0.05);
    smooth.current = THREE.MathUtils.damp(smooth.current, s.progress.current, 3.4, d);
    const pose = sampleWaypoints(smooth.current);

    // Gentle cinematic sway; disabled for reduced motion / pause.
    const sway = s.reducedMotion ? 0 : Math.sin(smooth.current * Math.PI * 2) * 1.4;
    const bob = s.reducedMotion || s.paused ? 0 : Math.sin(state.clock.elapsedTime * 0.45) * 0.18;

    tmpPos.set(pose.pos[0] + sway, pose.pos[1] + bob, pose.pos[2]);
    tmpLook.set(pose.look[0], pose.look[1], pose.look[2]);

    const k = 1 - Math.exp(-3.6 * d);
    camera.position.lerp(tmpPos, k);
    lookCur.current.lerp(tmpLook, k);
    camera.lookAt(lookCur.current);
    if (Math.abs(camera.fov - pose.fov) > 0.01) {
      camera.fov = THREE.MathUtils.damp(camera.fov, pose.fov, 3.2, d);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
