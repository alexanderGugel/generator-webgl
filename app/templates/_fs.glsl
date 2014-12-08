precision mediump float;
varying vec3 anormal;
void main() {
  gl_FragColor = vec4(mix(abs(anormal), vec3(1), 0.25), 1);
}
