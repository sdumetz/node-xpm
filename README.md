# node-xpm
read xpm file for use in [node-x11](https://github.com/sidorares/node-x11)

##Usage

Sync version :

    var PixmapFromFile = require("xpixmap");
    var pixmap = new PixmapFromFile("file_path");

Async version :

    var PixmapFromFile = require("xpixmap");
    var map = new PixmapFromFile();
    map.open("file_path",function(err,pixmap){

    })
