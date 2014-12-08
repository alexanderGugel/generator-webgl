'use strict';

////////////////////////////////////////////////////////////////////////////////
// Dependencies                                                               //
////////////////////////////////////////////////////////////////////////////////
// We try to follow the unix philosophy by requiring a lot of different       //
// modules. All of them have a limited scope and do exactly one thing. Trying //
// to understand what each module does is a good starting point.              //
// Don't be afraid by the amount of dependencies. Each module is quite tiny.  //
////////////////////////////////////////////////////////////////////////////////

// Used for reading and inserting GLSL files via brfs transform.
var fs = require('fs');

// Small module for fitting a canvas element within the bounds of its parent.
var fit = require('canvas-fit');

// A shorthand module for creating a new WebGL context and basic animation loop.
var createContext = require('gl-context');

// An alternative wrapper for orbit-camera that works independently of
// game-shell.
var createCamera = require('canvas-orbit-camera');

// Core implementation of gl-shader without parser dependencies
var createShader = require('gl-shader-core');

// A flexible wrapper for gl-vao and gl-buffer that you can use to set up
// renderable WebGL geometries from a variety of different formats.
var createGeometry = require('gl-geometry');

// Javascript Matrix and Vector library for High Performance WebGL apps
var mat4 = require('gl-matrix').mat4;
var quat = require('gl-matrix').quat;

// Takes a list of vertices and faces, giving you back an array of individual
// triangles.Takes a list of vertices and faces, giving you back an array of
// individual triangles.
var unindex = require('unindex-mesh');

// Given an array of triangles' vertices, return a `Float32Array` of their
// normal vectors.
var faces = require('face-normals');

// The Stanford bunny
var bunny = require('bunny');





////////////////////////////////////////////////////////////////////////////////
// Initialize the magic                                                       //
////////////////////////////////////////////////////////////////////////////////

var canvas;
function initCanvas() {
  canvas = document.body.appendChild(document.createElement('canvas'));
  window.addEventListener('resize', fit(canvas), false);
}

var context, proj, view, width, height;
function initContext() {
  context = createContext(canvas, {}, function render() {});
  width  = context.drawingBufferWidth;
  height = context.drawingBufferHeight;
  context.viewport(0, 0, width, height);
  context.enable(context.DEPTH_TEST);
  proj = mat4.create();
  view = mat4.create();
  mat4.perspective(proj,
    Math.PI / 4,
    width / height,
    0.01,
    100
  );
}

var camera;
function initCamera() {
  camera = createCamera(context.canvas, {
    pan: false,
    scale: false,
    rotate: false
  });
  camera.distance = 20;
  camera.center = [0, 4, 0];
  camera.view(view);
  quat.identity(camera.rotation);
}

var geometry, uniforms, attributes, shader;
function initBunny() {
  bunny = { positions: unindex(bunny.positions, bunny.cells) };
  bunny.normals = faces(bunny.positions);

  geometry = createGeometry(context)
  .attr('position', bunny.positions)
  .attr('normal', bunny.normals);

  uniforms = [{
    name: 'proj',
    type: 'mat4'
  }, {
    name: 'view',
    type: 'mat4'
  }];

  attributes = [];

  shader = createShader(
    context,
    fs.readFileSync(__dirname + '/vs.glsl'),
    fs.readFileSync(__dirname + '/fs.glsl'),
    uniforms,
    attributes
  );

  geometry.bind(shader);

  shader.uniforms.proj = proj;
  shader.uniforms.view = view;

  geometry.draw(context.TRIANGLES);
}

function init() {
  initCanvas();
  initContext();
  initCamera();
  initBunny();
}

init();
