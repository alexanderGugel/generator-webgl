'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('webgl:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.editorconfig',
      'fs.glsl',
      '.gitattributes',
      '.gitignore',
      'index.html',
      'index.js',
      '.jshintrc',
      'package.json',
      'README.md',
      'vs.glsl'
    ]);
  });
});
