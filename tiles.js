function Tile(){
  this.width = [];
  this.alltiles = $(".tile");
}

Tile.prototype.checkOnTile = function(player, tileToCheck){
  var resultX = false;
  var resultY = false;
  if(player.x >= parseInt(tileToCheck.css("left")) && player.x <= parseInt(tileToCheck.css("left")) + tileToCheck.width()){
    resultX = true;
  }
  if(player.y - tileToCheck.height() == parseInt(tileToCheck.css("bottom"))){
    resultY = true;
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
