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

### options

Only supported option is format. It can be RGBA or BGRA.

Default is BGRA as it's what we need for x11. for html5 canvas, one would use RGBA.


    var pixmap = new PixmapFromFile("file_path",{format:"RGBA"});
    //OR asynchronous :
    var pixmap = new PixmapFromFile({format:"RGBA"});
