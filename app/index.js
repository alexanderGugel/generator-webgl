'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to ' + chalk.red(this.pkg.name) + '!'
    ));

    var prompts = [{
      name: 'name',
      message: 'How would you like me to call your app?',
      default: process.cwd().split(path.sep).pop()
    }, {
      type: 'confirm',
      name: 'openRepo',
      message: 'Would you mind staring me on GitHub?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;

      done();
    }.bind(this));
  },

  writing: function () {
    this.template('_editorconfig', '.editorconfig');
    this.template('_gitattributes', '.gitattributes');
    this.template('_gitignore', '.gitignore');
    this.template('_index.html', 'index.html');
    this.template('_index.js', 'index.js');
    this.template('_jshintrc', '.jshintrc');
    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');
    this.template('_fs.glsl', 'fs.glsl');
    this.template('_vs.glsl', 'vs.glsl');
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      bower: false
    });
  }
});
