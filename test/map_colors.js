

describe("mapColors",function(){
  var pixmap, data, sizes;
  before(function(){
    pixmap = new PixmapFromFile();

    sizes = [
      pixmap.getSize(fixtures[0]),
      pixmap.getSize(fixtures[1])
    ]
  });

  it("create object from array (1)",function(){
    var colors = pixmap.mapColors(fixtures[0],sizes[0]);
    expect(colors).to.have.property(" ","00000000");
    expect(colors).to.have.property(".","3A32E4FF");
  });
  it("create object from array (2)",function(){
    var colors = pixmap.mapColors(fixtures[1],sizes[1]);
    expect(colors).to.have.property("#.","40C3ECFF");
  });
});
