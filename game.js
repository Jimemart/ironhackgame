function Game(){
  this.score = 0;
  this.height = $("#board").height();
  this.tilesNum = 0;
  this.width = $("#board").width();
  this.keyJump = false;
  this.keyLeft  = false;
  this.keyRight = false;
  this.gameOver = false;
  this.backgroundSpeed = 2;
  this.lives = 0;
  this.hearts = $(".life");
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
  player.speedY = 30;
  player.gravity = 2;
  tiles.speed = 20;
  tiles.destroy = 0.4;
};

Game.prototype.paralax = function(){
  var posBackground = parseInt($("#board").css("background-position-y"));
  posBackground += this.backgroundSpeed;
  $("#board").css("background-position-y", posBackground);
};
Game.prototype.rescue = function(){
  player.y = 700;
  player.x = 150;
  game.lives -= 1;
  var toDelete = this.hearts[this.hearts.length-1];
  $(toDelete).css("display","none");
  $(toDelete).removeClass("life");

};
