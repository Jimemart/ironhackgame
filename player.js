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


Player.prototype.update = function() {

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
  if (this.x < $("#board").width() && this.x > 0) {
    $(this.divPlayer).css("left", this.x);
  }
  if (game.keyJump) {
    if (this.isFloor) {
      if (this.y >= 300) {
        tiles.createTile();
        game.score += 10;
      }
      if (game.score >= 50 && game.score % 50 == 0) {
        bonus.createObject();
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
        game.rescue();
      }
    }

  }
  if (this.speedY <= 0) {
    this.isFloor = false;
    var that = this;
    tiles.alltiles.each(function() {
      if (tiles.checkOnTile(that, $(this))) {
        var theTile = this;
        $(that.divPlayer).removeClass("jumping");
        // tiles.shakeTile(this);
        // tiles.setSelfDestroy(tiles.destroy,this);
        that.isFloor = true;
        that.speedY = 0;
      }
    });
  }
  bonus.destroyUs();
  tiles.destroyMe();
  bonus.checkCollision();
  tiles.checkHigher();
  game.updateScore();
  this.backgrounds();
};

Player.prototype._goingUp = function() {
  this.speedY -= this.gravity;
  this.y += this.speedY;
  this.divPlayer.css("bottom", this.y + "px");
};
Player.prototype.backgrounds = function(){
  if(game.keyRight && !this.poisoned && this.isFloor){
    this.background = "url('img/goat-right.gif')";
  }
  if(game.keyRight && this.poisoned && this.isFloor){
    this.background = "url('img/goat-right-poisoned.gif')";
  }
  if(game.keyRight && this.poisoned && !this.isFloor){
    this.background = "url('img/goat-jump-2-psico.png')";
  }
  if(game.keyRight && !this.poisoned && !this.isFloor){
    this.background = "url('img/goat-jump.png')";
  }
  if(game.keyLeft && !this.poisoned && this.isFloor){
    this.background = "url('img/goat-right.gif')";
  }
  if(game.keyLeft && this.poisoned && this.isFloor){
    this.background = "url('img/goat-right-poisoned.gif')";
  }
  if(game.keyLeft && this.poisoned && !this.isFloor){
    this.background = "url('img/goat-jump-psico.png')";
  }
  if(game.keyLeft && !this.poisoned && !this.isFloor){
    this.background = "url('img/goat-jump.png')";
  }
  $(this.divPlayer).css("background-image",this.background);
};
