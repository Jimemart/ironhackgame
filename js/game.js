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
      that.showScore();
      $("#player").remove();
    }
  }, 30);

  // this.renderPlayer();
};
Game.prototype.startMusic = function(){
  var audio = document.createElement("audio");
  audio.src = "music/bso.ogg";
  audio.play();
};
Game.prototype.renderPlayer = function(){
  $("#board").append(player.createPlayer());
};
Game.prototype.showScore = function(){
  clearInterval(this.myInterval);
  var audio = document.createElement("audio");
  audio.src = "music/goat-die.flac";
  audio.play();
  var divScore = $("<div>").addClass("yourscore");
  var firstText = $("<h2>").text("You've got");
  var secondText = $("<h2>").text(this.score);
  var thirdText = $("<h2>").text("points");
  var butt = $("<button>").addClass("again").text("TRY AGAIN").attr("id","tryAgain");
  butt.on("click",function(){game.restart();});
  $(divScore).append(firstText).append(secondText).append(thirdText).append(butt);
  $("#board").append(divScore);
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
Game.prototype.rescue = function(player){
    this.minusOne();
  if(this.screenTiles.length > 0){

  this.respawn(player);

  this.playerInvencible(player);
  console.log(this.lives);
}
else{
  this.gameOver = true;
}
};
Game.prototype.minusOne = function(){
  this.lives -= 1;
  var toDelete = this.hearts[this.hearts.length-1];
  $(toDelete).css("display","none");
  $(toDelete).removeClass("life");

  this.hearts = $(".life");
};
Game.prototype.respawn = function(player){
  var placeToRespawn = this.screenTiles[0];
  var heightToRespawn = parseInt($(placeToRespawn).css("bottom")) + 50;
  var xToRespawn = parseInt($(placeToRespawn).css("left"))+10;
  player.y = heightToRespawn;
  player.x = xToRespawn;
};
Game.prototype.playerInvencible = function(player){
  player.invencible = true;
  console.log(player.invencible);
  setTimeout(function(){
    player.invencible = false;
    console.log(player.invencible);
  },4000);
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
  this.createDifficult();
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
Game.prototype.createDifficult = function(){
  var diff = $("<button>").attr("id","difficult").text("HARD");
  $("#game").append(diff);
  $("#difficult").on("click",function(){
    game.hard = true;
    $("#difficult").css("background","#ef3726");
  });
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
