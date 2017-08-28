function Game(){
  this.score = 0;
  this.height = $("#board").height();
  this.tilesNum = 0;
  this.width = $("#board").width();
}

Game.prototype.renderPlayer = function(){
  $("#board").append(player.createPlayer());
};
