'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('es6-node:app', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        'task runner' : 'gulp',
        'authorName' : 'AuthorName'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      'gulpfile.js',
      'src/index.js',
      'src/index.spec.js'
    ]);
  });


  it('replaces the name of person with the given name', function(){
    var strVar="";
        strVar += "import {expect} from \"chai\";\n";
        strVar += "import Index from \".\/index\";\n";
        strVar += "\n";
        strVar += "describe(\"Index\", ()=>{\n";
        strVar += "  it(\"says hello to someone\", ()=>{\n";
        strVar += "    expect(new Index().hello(\"AuthorName\"), \"Hello AuthorName\");\n";
        strVar += "  });\n";
        strVar += "});\n";
        strVar += "";

    assert.fileContent('src/index.spec.js',strVar);
  })
});
