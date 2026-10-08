import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';
import { sampleJourney } from '../lib/journey';
import { planetBySlug } from '../data/planets';
import { usePlanets } from '../store';

/**
 * Scroll-driven camera rig. Samples the keyframed journey at the current
 * scroll progress, then damps toward the sample with maath — the camera is
 * never welded to the scrollbar, it rides a dolly. Clicking a planet sets a
 * one-shot focus target: the camera flies in close while the dossier opens.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera);
  const lookCur = useRef(new THREE.Vector3(0, 0.4, 0));
  const tmpV = useRef(new THREE.Vector3());
  const tmpT = useRef(new THREE.Vector3());
  const focusPos = useRef(new THREE.Vector3());
  const hasFocus = useRef(false);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30);
    const st = usePlanets.getState();
    if (st.paused) return;

    const sel = st.selected;
    if (sel) {
      const cfg = planetBySlug(sel);
      if (cfg) {
        if (!hasFocus.current) {
          // Approach from the camera's current direction — no teleporting.
          tmpV.current.set(cfg.position[0], cfg.position[1], cfg.position[2]);
          tmpT.current
            .copy(camera.position)
            .sub(tmpV.current)
            .normalize()
            .multiplyScalar(cfg.radius * 3.4)
            .add(tmpV.current);
          tmpT.current.y = Math.max(tmpT.current.y, tmpV.current.y + cfg.radius * 1.2);
          focusPos.current.copy(tmpT.current);
          hasFocus.current = true;
        }
        easing.damp3(camera.position, focusPos.current, 0.32, dt);
        tmpV.current.set(cfg.position[0], cfg.position[1], cfg.position[2]);
        easing.damp3(lookCur.current, tmpV.current, 0.32, dt);
        camera.lookAt(lookCur.current);
        return;
      }
    }
    hasFocus.current = false;

    const s = sampleJourney(st.progress.current);
    tmpV.current.set(s.pos[0], s.pos[1], s.pos[2]);
    tmpT.current.set(s.look[0], s.look[1], s.look[2]);
    easing.damp3(camera.position, tmpV.current, 0.3, dt);
    easing.damp3(lookCur.current, tmpT.current, 0.3, dt);
    camera.lookAt(lookCur.current);
  });

  return null;
}
