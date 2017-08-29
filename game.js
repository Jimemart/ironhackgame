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
Game.prototype.updateScore = function(){
  $("#score").text(this.score);
};
Game.prototype.dificult = function(){
  player.speedY = 40;
  player.gravity = 3;
  tiles.speed = 15;
  tiles.destroy = 0.4;
};
