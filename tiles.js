function Tile(){
  this.width = [300,200,150];
  this.alltiles = $(".tile");
  this.left = [0, 100, 200, 300, 400];
}

Tile.prototype.checkOnTile = function(player, tileToCheck){
  var resultX = false;
  var resultY = false;
  if(player.x >= parseInt(tileToCheck.css("left"))-player.divPlayer.width() && player.x <= parseInt(tileToCheck.css("left")) + tileToCheck.width()){
    resultX = true;
  }
  if(resultX){
    var pY = player.y;
    var ps = -player.speedY;
    var tileH = tileToCheck.height();
    var tileY = parseInt(tileToCheck.css("bottom"));
    var upperLimit = tileY + tileH + ps;
    var lowerLimit = tileY + tileH;
    resultY = (pY >= lowerLimit) && (pY <= upperLimit);
  }
  return resultX && resultY;
};


Tile.prototype.tilesGoDown = function(){
  tiles.alltiles.each(function(tile){
	var position = parseInt($(this).css("bottom"));
	position -=10;
	$(this).css("bottom", position);
});
};

Tile.prototype.createTile = function(){
  var newTile = $("<div>").addClass("tile"); var screenWidth = game.height;
  $(newTile).css("bottom", screenWidth + 70);
  $(newTile).css("left", this.left[this._pickRandom(this.left)]);
  $(newTile).css("width", this.width[this._pickRandom(this.width)]);
  $("#board").append(newTile);
  this._tileOut(newTile);
  tiles.alltiles = $(".tile");
};

Tile.prototype._pickRandom = function(arr){
  return Math.floor(Math.random()*arr.length);
};

Tile.prototype._tileOut = function(toDisappear){
  setTimeout(function(){
    $(toDisappear).css("display","none");
  },3000);
};
