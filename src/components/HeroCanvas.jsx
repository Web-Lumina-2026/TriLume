import { useEffect, useRef } from "react";

/**
 * Dark, slow-moving mural rendered on a fragment shader — warm amber
 * and ember lights drifting over espresso, plus a fine film grain.
 * Reacts slightly to pointer movement.
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof WebGLRenderingContext === "undefined") return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const vert = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;
    const frag = `
precision mediump float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;

// cheap value noise
float hash(vec2 v) {
  return fract(sin(dot(v, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 v) {
  vec2 i = floor(v), f = fract(v);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 v) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    s += a * noise(v);
    v *= 2.03;
    a *= 0.5;
  }
  return s;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time * 0.035;
  vec2 drift = u_mouse * 0.06;

  // large slow convection of light
  float m = fbm(uv * 2.2 + vec2(t * 0.4, -t) + drift);
  m = m * 0.65 + 0.35 * fbm(uv * 5.0 - vec2(t, t * 0.3));

  // espresso base, warmed by the flow
  vec3 base = vec3(0.118, 0.086, 0.062);          // #1e1610
  vec3 amber = vec3(0.62, 0.44, 0.20);            // candlelight
  vec3 ember = vec3(0.28, 0.14, 0.08);            // deep glow

  vec3 col = mix(base, ember, smoothstep(0.35, 0.8, m));
  col = mix(col, amber, pow(smoothstep(0.55, 0.95, m), 2.2) * 0.55);

  // vignette keeps the type readable
  float vig = smoothstep(1.25, 0.35, length(uv - 0.5) * 1.6);
  col *= mix(0.55, 1.0, vig);

  // film grain
  float g = hash(gl_FragCoord.xy + fract(u_time) * 61.7) - 0.5;
  col += g * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointer = (e) => {
      target.x = e.clientX / innerWidth - 0.5;
      target.y = e.clientY / innerHeight - 0.5;
    };
    addEventListener("pointermove", onPointer, { passive: true });

    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    addEventListener("resize", resize);

    let raf;
    const start = performance.now();
    const frame = (now) => {
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onPointer);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
