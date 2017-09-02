function Player(x, y, speedY, speedX, gravity) {
  this.x = x;
  this.y = y;
  this.background = "";
  this.poisoned = false;
  this.speedY = speedY;
  this.speedX = speedX;
  this.isFloor = true;
  this.gravity = gravity;
  this.divPlayer = $("<div>").attr("id", "player").attr("class", "me");
  this.divPlayer.css({
    bottom: this.y,
    left: this.x
  });
  $("#board").append(this.divPlayer);
}


Player.prototype.update = function(game,tiles,rocks,bonus) {

  if (game.keyRight) {
    if (!this.poisoned) {
      this.speedX = 15;
    } else {
      this.speedX = -15;
    }
  }
  if (game.keyLeft) {
    if (!this.poisoned) {
      this.speedX = -15;
    } else {
      this.speedX = 15;
    }
  }
  this.x += this.speedX;
  if (this.x < $("#board").width()-50 && this.x > 0) {
    $(this.divPlayer).css("left", this.x);
  }
  if (game.keyJump) {
    if (this.isFloor) {
      game.score += 10;
      if (this.y >= 300) {
        tiles.createTile();

      }
      if (game.score >= 50 && game.score % 50 == 0) {
        bonus.createObject();
      }
      if(game.score >0 && game.score % 40 == 0 && this.y < 600){
        rocks.createRock();
      }
      if(game.score > 200 && game.score % 100 === 0){
        game.dificult();
      }

      this.speedY = 28;
      this.isFloor = false;
    }
  }
  if (!this.isFloor) {
    $(this.divPlayer).addClass("jumping");
    this.isFloor = false;
    this._goingUp();


    if (this.y >= 200 && this.speedY >= 0) {
    game.enviromentalMovement();
    }
    if (this.y <= 0) {
      if (game.lives < 1) {
        game.gameOver = true;
      } else {
        game.rescue(player);
        this.goatDie();
      }
    }
    if(this.x<= 0){
      this.specialJumpRight(game);
    }
    if(this.x > $("#board").width()-70){
      this.specialJumpLeft(game);
    }

  }
  if (this.speedY <= 0) {
    this.isFloor = false;
    var that = this;
    tiles.alltiles.each(function() {
      if (tiles.checkOnTile(that, $(this))) {
        // var theTile = this;
        $(that.divPlayer).removeClass("jumping");

        if(!$(this).hasClass("stay")){
          if(game.hard){
        tiles.shakeTile(this);
        tiles.setSelfDestroy(tiles.destroy,this);
      }
      }
        that.isFloor = true;
        that.speedY = 0;
        that.jetpack = false;
      }
    });
  }
  rocks.checkCollision(game, player);
  bonus.destroyUs();
  tiles.destroyMe();
  bonus.checkCollision(player,tiles,game);
  tiles.checkHigher();
  game.updateScore();
  this.backgrounds(game);
  rocks.rocksGoDown();
  rocks.disappear();
  game.upDateScreenTiles();
};

Player.prototype._goingUp = function() {

  this.speedY -= this.gravity;

  this.y += this.speedY;
  if(this.y < $("#board").height()){
  this.divPlayer.css("bottom", this.y + "px");
}
};
Player.prototype.backgrounds = function(game){
  if(game.keyRight && !this.poisoned && this.isFloor){
    this.background = "url('./img/goat-right.gif')";
  }
  if(game.keyRight && this.poisoned && this.isFloor){
    this.background = "url('./img/goat-left-poisoned.gif')";
  }
  if(game.keyRight && this.poisoned && !this.isFloor){
    this.background = "url('./img/goat-jump-psico.png')";
  }
  if(game.keyRight && !this.poisoned && !this.isFloor){
    this.background = "url('./img/goat-jump.png')";
  }
  if(game.keyLeft && !this.poisoned && this.isFloor){
    this.background = "url('./img/goat-left.gif')";
  }
  if(game.keyLeft && this.poisoned && this.isFloor){
    this.background = "url('./img/goat-right-poisoned.gif')";
  }
  if(game.keyLeft && this.poisoned && !this.isFloor){
    this.background = "url('./img/goat-jump-2-psico.png')";
  }
  if(game.keyLeft && !this.poisoned && !this.isFloor){
    this.background = "url('./img/goat-jump.png')";
  }
  if(this.jetpack){
    this.background = "url('./img/GOAT-JETPACK.png')";
  }
  $(this.divPlayer).css("background-image",this.background);
};
Player.prototype.specialJumpRight = function(game){
  if(game.keyRight && !this.poisoned && !this.jetpack){
    this.speedY = 30;
    $("#player").addClass("spin");
    setTimeout(function(){
      $("#player").removeClass("spin");
    },1000);
  }
};
Player.prototype.specialJumpLeft = function(game){
  if(game.keyLeft && !this.poisoned && !this.jetpack){
    this.speedY = 30;
    $("#player").addClass("spin");
    setTimeout(function(){
      $("#player").removeClass("spin");
    },1000);
  }
};
Player.prototype.goatDie = function(){
  var goat = document.createElement("audio");
  goat.src = "music/goat.flac";
  goat.play();
};
