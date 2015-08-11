//TEST FRAMEWORKS
var chai = require('chai');
var fs = require('fs');
chai.config.includeStack = true;

global.PixmapFromFile = require("../lib")
global.fixtures = [
  fs.readFileSync(__dirname+"/fixtures/wiki.xpm",{encoding:"utf-8"}),
  fs.readFileSync(__dirname+"/fixtures/logo.xpm",{encoding:"utf-8"})
]
//server.start(server.app);
global.expect = chai.expect;
