
describe("getArray",function(){
  var pixmap, sizes;
  before(function(){
    pixmap = new PixmapFromFile();
    sizes = [
      pixmap.getSize(fixtures[0]),
      pixmap.getSize(fixtures[1])
    ]

  });

    it("create array from data ",function(){
      for (var index=0;index<fixtures.length;index++){
        var res = pixmap.getArray(fixtures[index],sizes[index]);
        expect(res).to.have.property("length",pixmap.getSize(fixtures[index]).height);
        expect(typeof res[0]).to.equal("string");
      }
    });

})
