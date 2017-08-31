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
Game.prototype.start = function(){
  tiles = new Tile();
  player = new Player(350, 40, 0, 0, 2);

  bonus = new BonusObjects();
  rocks = new Rocks();
  // this.renderPlayer();
};
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
  var placeToRespawn = tiles.alltiles[tiles.alltiles.length-1];
  var heightToRespawn = parseInt($(placeToRespawn).css("bottom")) + 50;
  var xToRespawn = parseInt($(placeToRespawn).css("left"))+10;
  game.lives -= 1;
  var toDelete = this.hearts[this.hearts.length-1];
  $(toDelete).css("display","none");
  $(toDelete).removeClass("life");
  player.y = heightToRespawn;
  player.x = xToRespawn;


};
Game.prototype.enviromentalMovement = function(){
  tiles.tilesGoDown();
  bonus.bonusGoDown();
  game.paralax();
};
