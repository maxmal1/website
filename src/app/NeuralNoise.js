import React, { useEffect, useRef } from 'react';

const NeuralNoiseBackground = () => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const uniformsRef = useRef(null);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    tX: 0,
    tY: 0,
  });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

    const vertShader = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragShader = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;

        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer);
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2 - .07 * p);
        }
        return res.x + res.y;
      }

      void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;

        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = .5 * pow(1. - p, 2.);

        float t = .001 * u_time;
        vec3 color = vec3(0.);

        float noise = neuro_shape(uv, t, p);

        noise = 1.2 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(.0, noise - .5);
        noise *= (1. - length(vUv - .5));

        color = normalize(vec3(.2, .5 + .4 * cos(3. * u_scroll_progress), .5 + .5 * sin(3. * u_scroll_progress)));

        color = color * noise;

        gl_FragColor = vec4(color, noise);
      }
    `;

    function createShader(gl, sourceCode, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, sourceCode);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    function createShaderProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
        return null;
      }

      return program;
    }

    function getUniforms(gl, program) {
      let uniforms = {};
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function resizeCanvas() {
      if (!canvasEl || !glRef.current) return;
      
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      
      glRef.current.uniform1f(uniformsRef.current.u_ratio, canvasEl.width / canvasEl.height);
      glRef.current.viewport(0, 0, canvasEl.width, canvasEl.height);
    }

    function updateMousePosition(eX, eY) {
      const pointer = pointerRef.current;
      pointer.tX = eX;
      pointer.tY = eY;
    }

    function initShader() {
      const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");

      if (!gl) {
        console.error("WebGL is not supported by your browser.");
        return null;
      }

      const vertexShader = createShader(gl, vertShader, gl.VERTEX_SHADER);
      const fragmentShader = createShader(gl, fragShader, gl.FRAGMENT_SHADER);

      const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
      const uniforms = getUniforms(gl, shaderProgram);

      const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      gl.useProgram(shaderProgram);

      const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
      gl.enableVertexAttribArray(positionLocation);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      return { gl, uniforms };
    }

    function render() {
      if (!glRef.current || !uniformsRef.current) return;

      const currentTime = performance.now();
      const pointer = pointerRef.current;

      pointer.x += (pointer.tX - pointer.x) * .5;
      pointer.y += (pointer.tY - pointer.y) * .5;

      glRef.current.uniform1f(uniformsRef.current.u_time, currentTime);
      glRef.current.uniform2f(
        uniformsRef.current.u_pointer_position, 
        pointer.x / window.innerWidth, 
        1 - pointer.y / window.innerHeight
      );
      glRef.current.uniform1f(
        uniformsRef.current.u_scroll_progress, 
        window.pageYOffset / (2 * window.innerHeight)
      );

      glRef.current.drawArrays(glRef.current.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    }

    const { gl, uniforms } = initShader();
    
    glRef.current = gl;
    uniformsRef.current = uniforms;

    // Event Listeners
    const handlePointerMove = (e) => updateMousePosition(e.clientX, e.clientY);
    const handleTouchMove = (e) => updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    const handleClick = (e) => updateMousePosition(e.clientX, e.clientY);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    render();

    // Cleanup function
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="neuro"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        opacity: 0.95,
        zIndex: -1
      }}
    />
  );
};

export default NeuralNoiseBackground;