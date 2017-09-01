function Tile(){
  this.width = [300,200,100];
  this.alltiles = $(".tile");
  this.left = [0, 100, 200, 300, 400,500];
  this.speed = 15;
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
    var upperLimit = tileY + tileH + ps+5;
    var lowerLimit = tileY + tileH;
    resultY = (pY >= lowerLimit) && (pY <= upperLimit);
  }
  return resultX && resultY;
};


Tile.prototype.tilesGoDown = function(){
  var that = this;
  tiles.alltiles.each(function(){
	var position = parseInt($(this).css("bottom"));
	position -= that.speed;
	$(this).css("bottom", position);
});
};

Tile.prototype.createTile = function(){
  var screenHeight = game.height;
  this.newTile = $("<div>").addClass("tile")
      .css("bottom", screenHeight-10)
      .css("left", this.left[this._pickRandom(this.left)])
      .css("width", this.width[this._pickRandom(this.width)]);
  if(this.newTile.width() === 300){
    $(this.newTile).css("background-image","url('./img/long-platform.png')");
  }
  else if(this.newTile.width() === 200){
    $(this.newTile).css("background-image","url('./img/medium-platform.png')");
  }
  else{
    $(this.newTile).css("background-image","url('./img/small-platform.png')");
  }
  $("#board").append(this.newTile);
  tiles.alltiles = $(".tile");
};

Tile.prototype._pickRandom = function(arr){
  return Math.floor(Math.random()*arr.length);
};

Tile.prototype.setSelfDestroy = function(n,removeMe, game){
  setTimeout(function(){
    $(removeMe).remove();
  },n * 1000);
this.alltiles = $(".tile");

};

Tile.prototype.shakeTile = function(mytile){
  setTimeout(function(){
  $(mytile).addClass("animated bounce");
  $("#floor").removeClass("animated bounce");
},300);

};

Tile.prototype.checkHigher = function(){
  var firstTile = tiles.alltiles[tiles.alltiles.length-1];
  if(parseInt($(firstTile).css("bottom")) <= 450){
    this.createTile();
  }
};

Tile.prototype.destroyMe = function(){
  this.alltiles.each(function(){
    if(parseInt($(this).css("bottom")) < 0){
      $(this).remove();
    }
  });
};
