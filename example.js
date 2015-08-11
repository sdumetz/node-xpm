#!/usr/bin/env node
/*
This code was first crafted by sidorares on https://github.com/sidorares/node-x11/blob/master/examples/png/test.js
It's just adapted for the new readxpm function
 */
var x11 = require("x11");
var PixmapFromFile = require('./lib');

if(!process.argv[2]){
  console.log("usage : node example.js <image.xpm>");
  process.exit();
}

var Exposure = x11.eventMask.Exposure;

x11.createClient(function(err, display)
{
  var X = display.client;
  X.require('render', function(err, Render) {
    var root = display.screen[0].root;
    var pixmap = new PixmapFromFile();
    pixmap.open(process.argv[2],function(err,logo){
      if(err){
        console.log(new Error().stack);
        return console.error("pixmap open Error : ",err);
      }
      main(root, X, Render,logo);
    });
  });
});

function main(root, X, Render, logo) {

  var win, picWin, pic, gc;

  win = X.AllocID();
  X.CreateWindow(
     win, root,
     0, 0, logo.width, logo.height,
     0, 0, 0, 0,
     { eventMask: Exposure }
  );
  X.MapWindow(win);

  gc = X.AllocID();
  X.CreateGC(gc, win);

  var logoPixmap = X.AllocID();
  X.CreatePixmap(logoPixmap, win, 24, logo.width, logo.height);
  // TODO: add proper png pixel conversion here
  X.PutImage(2, logoPixmap, gc, logo.width, logo.height, 0, 0, 0, 24, logo.data);

  var logoPicture = X.AllocID();
  Render.CreatePicture(logoPicture, logoPixmap, Render.rgb24);
  var winPicture = X.AllocID();
  Render.CreatePicture(winPicture, win, Render.rgb24);

  X.on('event', function(ev) {
    if (ev.name == 'Expose')
      Render.Composite(3, logoPicture, 0, winPicture, 0, 0, 0, 0, 0, 0, logo.width, logo.height);
  });
}
