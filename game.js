function Game(){
  this.score = 0;
  this.height = $("#board").height();
  this.tilesNum = 0;
  this.width = $("#board").width();
  this.keyJump = false;
  this.keyLeft  = false;
  this.keyRight = false;
  this.gameOver = false;

}

Game.prototype.renderPlayer = function(){
  $("#board").append(player.createPlayer());
};

Game.prototype.restart = function(){
  location.reload();
};
