/*
TODO: Search Short Cuts
  Find a way to short cut knowing parts of the map are 0 (or all the same value).
  could do it on a per row, = esier then collum since collum tuches every array.
  ?should save the points of the known hot points.
  =This could be array. or a Map with keys as value of the heat.
  Or could use a list so that it can be sorted by hottest to coldest points.

  Block hot points:
  (this would be a simialr optimization that you see with pyshicse and collisions).

  Quarter Arrays? if its all mirrored why not use just quarters?

TODO: peeks
  Save the Hottest points. this is likly to be a very common want.
  Save cold points also?
  extremum

TODO: fallOff patters?
  This would be for a all int version vs a float.
  ?could be done by checking if fallOff is a int or float.
  This would probably just be defencive code.
  To come up with paters I should think of diffrent uses ?pathfind ?lookUp Speed
  Agacent: fallOff 2
    10
    0  0  2  4  2  0  0
    0  2  4  6  4  2  0
    2  4  6  8  6  4  0
    4  6  8  10 8  6  4
    2  4  6  8  6  4  0
    0  2  4  6  4  2  0
    0  0  2  4  2  0  0

    6
    0  0  0  2  0  0  0
    0  0  2  4  2  0  0
    0  2  4  6  4  2  0
    2  4  6  8  6  4  2
    0  2  4  6  4  2  0
    0  0  2  4  2  0  0
    0  0  0  2  0  0  0

    5
    0  0  1  0  0
    0  1  3  1  0
    1  3  5  3  1
    0  1  3  1  0
    0  0  1  0  0

    set =>

TODO: Void Spots (Spots that dont have a value)
  use -1 ?
  Should the user be able to change them to live points during run time?
  What are the cons vs pros of making so that they cant change it live.

<flexible voids?>
  cons:
    More compexity. (witch isnt inherantly good but might be worth it).
    Cant make assumptions without Meat Data.

  pros:
    More optimization:
      can shrink arrays that have chunks of void.
      Could drop whole arrays of void. (would still need to keep track of meta data.)

TODO: Meta Data?
  Store Meta Data on each array.
  This might slow down small arrays. But in certian Arrays it could optimize.
  ? Optional? Could add this feature later.
  flexible meta data? as in no meta data unless it sees a worth opratuninty.

TODO: Merge Types
  Add, subtract, avrage, complex ...

TODO: Ideas
  Warnings? exmple "This Might Be to big to be used in a realtime app"
  Defult warmth. aka not defult = 0.
  Moving Scorce? This would be hard but Meta data might help with moving objects.
    This could be a object type?
    Finding a way to optimize this so the map doesnt need to be regenarated for raeal time apps.
    Not first prioraty => also all meta data optimizations would help with this.

  Bitboard layers for value. example 10 bitboards since value will max 10
*/

class Heatmap {

  static heatmap; //2d Array
  static height; //Y array of arrays
  static width; //X array of nums

  //Lookup more on how JS stores vars and see if lower values take less bytes
  static maxHeat;
  static minHeat;

  static fallOff; // Ratio? Faster fallOff
  static peeks; //Hottest points on the heat map;

  constructor(width,height,fallOff){
    this.width = width;
    this.height = height;
    this.fallOff = fallOff;

    this.peeks = [];

    this.heatmap = new Array(this.height);
    for (var i = 0; i < height; i++) {
      this.heatmap[i] = new Array(width).fill(0);
    }
  }


  //Sets a single point without any heat fallOff
  setPoint(val, x, y){
    this.heatmap[y][x] = val;
  }

  //Sets a single point without any heat fallOff but does add to the current heat.
  setHeat(heat,x,y){
    this.heatmap[y][x] += val;
  }

  // addHeat(heat,x,y){
  //   var lowestHeat = heat % this.fallOff;
  //   if(lowestHeat == 0) lowestHeat = this.fallOff;
  //
  //   var newArray = [];
  //
  //   var fallOffSteps = Math.ceil(heat/this.fallOff);
  //
  //   for (var row = 0; row < fallOffSteps; row++) {
  //     newArray.push([]);
  //
  //     for (var i = 0; i < (fallOffSteps-(row+1)); i++) newArray[row].push(0);
  //
  //     for (var i = 0; i < (row+1); i++) {
  //       newArray[row].push( lowestHeat + (this.fallOff*i) );
  //     }
  //
  //     for (var i = 1+(fallOffSteps-(row+1)); i < fallOffSteps; i++) {
  //       newArray[row].push(heat - (this.fallOff*i));
  //     }
  //
  //     for (var i = 0; i < (fallOffSteps-(row+1)); i++) newArray[row].push(0);
  //   }
  //
  //   for (var row = 1; row < fallOffSteps; row++){
  //     newArray.push([]);
  //     newArray[newArray.length-1].push(...newArray[fallOffSteps-(row+1)]);
  //   }
  //
  //   newArray.forEach((row, i) => {
  //     console.log(row.toString());
  //   });
  // }



  addHeat(heat,x,y){

    var lowestHeat = heat % this.fallOff;
    if(lowestHeat == 0) lowestHeat = this.fallOff;

    var fallOffSteps = Math.ceil(heat/this.fallOff);
    var length = 2*fallOffSteps - 1;
    var center = fallOffSteps-1;

    var newArray = [];
    for (var i = 0; i < length; i++) {
      newArray.push(new Array(length).fill(0));
    }

    var heatVal;
    for (var row = 0; row < fallOffSteps; row++) {
      for (var point = 0; point < row+1; point++) {
        heatVal = lowestHeat + (this.fallOff*(row-point));
        newArray[row][center - point] = heatVal;
        if(point != 0) newArray[row][center + point] = heatVal;
      }
      if(row != fallOffSteps) newArray[(length-1)-row] = newArray[row]; //This copys address.
    }

    newArray.forEach((row, i) => {
      console.log(row.toString());
    });

    // console.log(centerArray);

    // for (var i = 1; i < fallOffSteps; i++) {
    //   centerArray.push(centerArray[fallOffSteps-(i+1)]);
    // }

    // var heatVal;
    // for (var left = 0, right = endLength-1; left < fallOffSteps; left++, right--) {
    //   heatVal = lowestHeat + (this.fallOff*left);
    //   centerArray[left] = heatVal;
    //   centerArray[right] = heatVal;
    // }

    // for (var top = 0, bottom = endLength-1; top < fallOffSteps; top++, bottom--) {
    //   newArray.push(new Array(endLength).fill(0))
    //
    // }
  }




  // Add Heat ?(pattern, heat, fallOff)
  // Able to give a negitve heat?
  // ?subtract Heat ()

  // Find peeks

  // applyHeat()


  display(){
    this.heatmap.forEach((row, i) => {
      console.log(row.join(""));
    });
  }

}



module.exports = Heatmap;
