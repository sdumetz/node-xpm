

describe("getSize",function(){
  var pixmap;
  before(function(){
    pixmap = new PixmapFromFile();
  });
  it("parse size infos",function(){
    var size = pixmap.getSize(fixtures[0]);
    expect(size).to.deep.equal({width:24,height:20,count:3,length:1});
  });
});
