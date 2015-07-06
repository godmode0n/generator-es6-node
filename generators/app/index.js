'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    logo = require('../logo');


function writeFiles(context, tplContext){
  return function(file){
      context.fs.copyTpl(context.templatePath(file), context.destinationPath(file), tplContext);
  }
}

function writeDotFiles(context, tplContext){
  return function(file){
      context.fs.copyTpl(context.templatePath('dotfiles/'+file), context.destinationPath('.'+file), tplContext);
  }
}

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();


    this.log(yosay(
      'Welcome to godmode0n\'s ' + chalk.red('es6 node') + ' generator!'
    ));

    var prompts = [{
      type : 'string',
      name : 'authorName',
      message : 'What\'s your name?',
      default : yeoman.user,
      store : true
    }, {
      type : 'string',
      name : 'appName',
      message : 'What\'s your app name?',
      default : 'awesome-app',
      store : true
    }, {
      type : 'string',
      name : 'appVersion',
      message : 'Wha\'s the version of this app?',
      default : '0.0.1',
      store : true
    }, {
      type: 'list',
      choices : ['gulp'],
      name: 'task runner',
      message: 'What would you like to use as a task runner?',
      store : true,
      default : 'gulp'
    }];


    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    'Package File': function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props);
    },
    'Project Files': function () {
      ['gulpfile.js',, 'src/index.js', 'src/index.spec.js'].forEach(writeFiles(this, this.props));
    },
    'Dot Files' : function(){
      ['editorconfig', 'eslintrc', 'gitignore'].forEach(writeDotFiles(this, this.props));
    }
  },

  install: function () {
    this.npmInstall("", null, function(){
      this.log(yosay('Thx and remember:\n\n'));
      logo();
    }.bind(this));
  }
});
