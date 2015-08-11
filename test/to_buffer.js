

describe("toBuffer",function(){
  var pixmap, color, sizes,content;
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

  it("create buffer from arrays (1)",function(){
    var buf = pixmap.toBuffer(colors[0],content[0],sizes[0]);
    expect(buf.length).to.equal(sizes[0].width*sizes[0].height*4);
    expect(buf[0]).to.equal(0);
  });
});
