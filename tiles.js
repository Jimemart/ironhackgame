function Tile(){
  this.width = [300,200,100];
  this.alltiles = $(".tile");
  this.left = [0, 100, 200, 300, 400,500];
  this.speed = 10;
  this.destroy = 0.7;
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
  var that = this;
  tiles.alltiles.each(function(tile){
	var position = parseInt($(this).css("bottom"));
	position -= that.speed;
	$(this).css("bottom", position);
});
};

Tile.prototype.createTile = function(){
  var screenWidth = game.height;
  this.newTile = $("<div>").addClass("tile")
      .css("bottom", screenWidth + 70)
      .css("left", this.left[this._pickRandom(this.left)])
      .css("width", this.width[this._pickRandom(this.width)]);
  $("#board").append(this.newTile);
  tiles.alltiles = $(".tile");
};

Tile.prototype._pickRandom = function(arr){
  return Math.floor(Math.random()*arr.length);
};

Tile.prototype.setSelfDestroy = function(n,removeMe){
  setTimeout(function(){
    $(removeMe).remove();

  },n * 1000);
this.alltiles = $(" .tile");
};

Tile.prototype.shakeTile = function(mytile){
  setTimeout(function(){
  $(mytile).addClass("animated bounce");
},300);

};
