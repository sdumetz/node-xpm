var fs = require('fs');


function PixmapFromFile (path){
  if(path){
    return this.parse(fs.readFileSync(path, {encoding:"utf-8"}));
  }
}
/**
 *
 * @param  {[type]}   data     utf-8 file data
 * @param  {Function} callback optionnal callback.
 */
PixmapFromFile.prototype.parse = function (data) {
  if(!/^\/\*\s*XPM\s*\*\/$/m.test(data)){
    throw new Error("Not an XPM file");
  }
  var size = this.getSize(data);
  var content = this.getArray(data,size);
  var colors = this.mapColors(data,size);
  var buf = this.toBuffer(colors,content,size);
  size.data = buf;
  return size;
};
PixmapFromFile.prototype.getSize = function(data){
  var match = /{\n?"([0-9\s]*)\s?"/.exec(data);
  if(!match){
    throw new Error("can't parse size infos");
  }
  var values = match[1].split(" ").map(function(i){return parseInt(i)});
  return {width:values[0],height:values[1],count:values[2],length:values[3]}
}

PixmapFromFile.prototype.getArray = function(data,size){
  //var reg = new RegExp('"((?!(?:[0-9]+\\s?){4}).{'+size.length+'}(?!\\sc\\s).*)"',"g"); //Works also but much less simple
  var reg = new RegExp('"(.{'+size.width*size.length+'})"',"g");
  var res;
  var rows = [];
  while((res = reg.exec(data)) !== null){
    rows.push(res[1]);
  }
  if(rows.length != size.height){
    throw new Error("found : "+rows.length+" rows. Should have found :"+size.height+" rows.");
  }
  return rows;
}
// return RGBA color
PixmapFromFile.prototype.mapColors = function(content,size){
  var reg = new RegExp('"(.' + ((size.length > 1)? "{"+(size.length)+"}" : "") + ")\\s+c\\s+#?(None|[0-9a-fA-F]{6})\"","gm");
  var res;
  var colors = {};
  while((res = reg.exec(content)) !== null){
    if(res[2] === "None"){
      colors[res[1]] = "00000000"
    }else{
        colors[res[1]] = res[2]+"FF";//RGBA
    }

  }
  if(Object.keys(colors).length != size.count){
    throw new Error("found : "+Object.keys(colors).length+" colors. Should have found :"+size.count+" colors.");
  }
  return colors;
}


/**
 * Takes an array of rows. Each char/sequence represents a colored pixel
 * @param  {[type]} content [description]
 * @return {Buffer}         A 1d array of pixels in RGBA
 */
PixmapFromFile.prototype.toBuffer = function(colors,content,size){
  var buf = new Buffer(size.width*size.height*4);
  var offset = 0, byte,color;
  content.forEach(function(row){
    //console.log("parsing : ",row)
    while(row && row.length >0){
      var code = row.slice(0,size.length);
      row = row.slice(size.length);
      if(!colors[code]){
        throw new Error("unknown color : ",code);
      }
      color = colors[code];
      [4,2,0,6].forEach(function(i){
        buf.writeUInt8(parseInt(color[i]+color[i+1],16),offset);
        offset ++;
      });
    }
  });
  return buf;
}
PixmapFromFile.prototype.open = function(path,callback){
  var self = this;
  fs.readFile(path, {encoding:"utf-8"}, function(err,data){
    if(err){
      return callback(err);
    }else{
      callback(null,self.parse(data));
    }
  });


}

module.exports = PixmapFromFile;
