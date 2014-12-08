precision mediump float;
uniform mat4 proj;
uniform mat4 view;
varying vec3 anormal;
attribute vec3 position;
attribute vec3 normal;
void main() {
  anormal = normal;
  gl_Position = proj * view * vec4(position, 1);
}
