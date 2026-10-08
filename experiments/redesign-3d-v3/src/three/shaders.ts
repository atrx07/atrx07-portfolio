/**
 * Custom GLSL for realistic planets. One ShaderMaterial family — never
 * MeshStandardMaterial for surfaces — giving: sun-angle terminator blend
 * (day map ↔ night city lights), ocean-masked specular sun-glint, fresnel
 * atmosphere shells, and a fully procedural lava world.
 *
 * Color-management note: textures are intentionally left in NoColorSpace
 * (passthrough). The raw ShaderMaterial has no colorspace_fragment chunk, so
 * marking them sRGB would double-convert. Sampling the JPEG bytes directly
 * keeps the authored look exact.
 */

export const SURFACE_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
void main() {
  vUv = uv;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const SURFACE_FRAG = /* glsl */ `
uniform sampler2D uDayMap;
uniform sampler2D uNightMap;
uniform float uHasNight;
uniform vec3 uSunDir;
uniform float uHighlight;
uniform vec3 uAccent;
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPos);
  float sunAmount = dot(N, uSunDir);
  // Soft terminator band, not a hard edge.
  float dayMix = smoothstep(-0.12, 0.28, sunAmount);
  vec3 dayCol = texture2D(uDayMap, vUv).rgb;
  vec3 col = dayCol * (0.035 + 1.08 * max(sunAmount, 0.0));
  // City lights fade in on the night side.
  if (uHasNight > 0.5) {
    vec3 nightCol = texture2D(uNightMap, vUv).rgb;
    col += nightCol * (1.0 - dayMix) * 0.9;
  }
  // Specular sun-glint masked to oceans (blue-dominant texels).
  float ocean = smoothstep(0.06, 0.32, dayCol.b - max(dayCol.r, dayCol.g));
  vec3 H = normalize(uSunDir + V);
  float spec = pow(max(dot(N, H), 0.0), 48.0) * ocean * dayMix;
  col += vec3(1.0, 0.96, 0.88) * spec * 0.6;
  // Hover highlight: cool lift, stronger on the day side.
  col += uAccent * uHighlight * (0.22 + 0.5 * dayMix);
  gl_FragColor = vec4(col, 1.0);
}
`;

/** Fully procedural volcanic world — no good free lava texture exists. */
export const LAVA_FRAG = /* glsl */ `
uniform vec3 uSunDir;
uniform float uTime;
uniform float uHighlight;
uniform vec3 uAccent;
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return v;
}
void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPos);
  vec2 p = vUv * vec2(7.0, 3.5);
  float n = fbm(p + vec2(uTime * 0.008, 0.0));
  // Cracks where the ridged noise crosses its midpoint.
  float ridge = abs(n - 0.5) * 2.0;
  float crack = smoothstep(0.16, 0.02, ridge);
  float pulse = 0.85 + 0.15 * sin(uTime * 1.7 + n * 12.0);
  vec3 basalt = mix(vec3(0.045, 0.028, 0.026), vec3(0.14, 0.07, 0.05), n);
  vec3 lavaCol = mix(vec3(1.0, 0.22, 0.02), vec3(1.0, 0.72, 0.18), crack) * pulse;
  float sunAmount = dot(N, uSunDir);
  float dayMix = smoothstep(-0.12, 0.28, sunAmount);
  vec3 col = basalt * (0.04 + 1.05 * max(sunAmount, 0.0));
  // Cracks glow on their own — brighter on the night side.
  col += lavaCol * crack * (0.5 + 1.5 * (1.0 - dayMix));
  // Hot fresnel rim.
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  col += vec3(0.85, 0.18, 0.04) * fres * 0.55;
  col += uAccent * uHighlight * 0.35;
  gl_FragColor = vec4(col, 1.0);
}
`;

/** BackSide additive fresnel atmosphere shell (classic glow-shell recipe). */
export const ATMO_VERT = /* glsl */ `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const ATMO_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uPower;
uniform float uIntensity;
varying vec3 vNormal;
void main() {
  float d = clamp(0.72 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0, 2.0);
  float intensity = pow(d, uPower) * uIntensity;
  gl_FragColor = vec4(uColor, 1.0) * intensity;
}
`;
