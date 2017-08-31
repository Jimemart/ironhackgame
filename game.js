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
  this.lives = 3;
  this.hearts = $(".life");
}

Game.prototype.start = function(){
  tiles = new Tile();
  player = new Player(350, 40, 0, 0, 2);

  bonus = new BonusObjects();
  rocks = new Rocks();
  this.createEnviroment();
  var that = this;
  this.myInterval = setInterval(function() {
    player.update(game,tiles,rocks,bonus);
    if (that.gameOver) {
      that.restart();
    }
  }, 30);

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
  var placeToRespawn = this.screenTiles[0];
  var heightToRespawn = parseInt($(placeToRespawn).css("bottom")) + 50;
  var xToRespawn = parseInt($(placeToRespawn).css("left"))+10;
  game.lives -= 1;
  var toDelete = this.hearts[this.hearts.length-1];
  $(toDelete).css("display","none");
  $(toDelete).removeClass("life");
  player.y = heightToRespawn;
  player.x = xToRespawn;
  this.hearts = $(".life");


};
Game.prototype.enviromentalMovement = function(){
  tiles.tilesGoDown();
  bonus.bonusGoDown();
  game.paralax();
};
Game.prototype.createEnviroment = function(){
  this.createLives();
  this.createScore();
  this.createTiles();

};
Game.prototype.createLives = function(){
  var life = $("<div>").attr("id","lifestore");
  var mylife1 = $("<div>").addClass("mylife1 life");
  var mylife2 = $("<div>").addClass("mylife2 life");
  var mylife3 = $("<div>").addClass("mylife3 life");
  $(life).append(mylife1).append(mylife2).append(mylife3);
  $("#game").append(life);
  this.hearts = $(".life");

};
Game.prototype.createScore = function(){
  var score = $("<div>").attr("id", "score");
  $("#board").append(score);
};
Game.prototype.createTiles = function(){

  var oneTile = $("<div>").addClass("iniciales tile final");
  var secondTile = $("<div>").addClass("iniciales tile high");
  var thirdTile = $("<div>").addClass("iniciales tile ");
  var fourthTile = $("<div>").addClass("iniciales tile right");
  // var floor = $("<div>").attr("id", "floor").addClass("tile");
  $("#board").append(oneTile).append(secondTile).append(thirdTile).append(fourthTile);
};
Game.prototype.upDateScreenTiles = function(){
  this.screenTiles = $(".tile");
};
