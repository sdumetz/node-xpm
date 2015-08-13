

describe("toBuffer",function(){
  var pixmap;
  var sizes,colors,content;
  var tests = [ 
    {index:0,format:"RGBA",expected:"3A32E4FF"},
    {index:1,format:"RGBA",expected:"4DBFE9FF"},
    {index:0,format:"BGRA",expected:"E4323AFF"},
    {index:1,format:"BGRA",expected:"E9BF4DFF"}
  ]
  before(function(){
    pixmap = new PixmapFromFile();
    sizes = [
      pixmap.getSize(fixtures[0]),
      pixmap.getSize(fixtures[1])
    ]
    colors = [
      pixmap.mapColors(fixtures[0],sizes[0]),
      pixmap.mapColors(fixtures[1],sizes[1])
    ]

    content = [
      pixmap.getArray(fixtures[0],sizes[0]),
      pixmap.getArray(fixtures[1],sizes[1])
    ]
  });
  tests.forEach(function(test) {
    it("create buffer from arrays ("+(test.index+1).toString()+") format : "+test.format,function(){
      var index= test.index
      pixmap.options.format = test.format
      var buf = pixmap.toBuffer(colors[index],content[index],sizes[index]);
      expect(buf.length).to.equal(sizes[index].width*sizes[index].height*4);
      var count = 0;
      while (buf[count]==0){
        count++;
      }//Get first non null pixel.
      expect(buf.readUInt32BE(count).toString(16).toUpperCase()).to.equal(test.expected);


    });
  });
});
