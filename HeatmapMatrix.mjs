


class Heatmap {

  static heatmap;
  static height;
  static height;
  static width;

  constructor(width,height){
    this.width = width;
    this.height = height;
    this.heatmap = new Array(this.height);
    for (var i = 0; i < height; i++) {
      this.heatmap[i] = new Array(width).fill(0);
    }
  }

  display(){
    this.heatmap.forEach((row, i) => {
      console.log(row.join(""));
    });
  }

}



module.exports = Heatmap;
