function Player(x,y,speedY, speedX, gravity){
  this.x = x;
  this.y = y;
  this.speedY = speedY;
  this.speedX = speedX;
  this.isFloor = true;
  this.gravity = gravity;
  this.divPlayer = $("<div>").attr("id","player").attr("class","me");
  this.divPlayer.css({bottom:this.y,left:this.x});
  $("#board").append(this.divPlayer);
}


Player.prototype.update = function(){
  if(game.keyRight){
    this.speedX = 15;
  }
  if(game.keyLeft){
    this.speedX = -15;
  }

  this.x += this.speedX;
  if(this.x < $("#board").width() && this.x > 0){
  $(this.divPlayer).css("left", this.x);
}
  if(game.keyJump){
    if(this.isFloor){
      if(this.y >= 300){
          tiles.createTile();
          game.score += 10;
      }
    if(game.score >= 100){
      game.dificult();
    }
    this.speedY = 30;
    this.isFloor = false;

  }
  }
  if(!this.isFloor){
    $(this.divPlayer).addClass("jumping");
      this.isFloor = false;
    this._goingUp();

    if(player.y >=350){
      tiles.tilesGoDown();
    }
    if(this.y <= 0){
      game.gameOver = true;
    }
  }
  if(this.speedY <=0){
    this.isFloor = false;
    var that = this;
    tiles.alltiles.each(function(){
      if(tiles.checkOnTile(that, $(this))){
        var theTile = this;
        $(that.divPlayer).removeClass("jumping");
        tiles.shakeTile(this);
        tiles.setSelfDestroy(tiles.destroy,this);
        that.isFloor = true;
        that.speedY = 0;
      }
    });
  }
tiles.checkHigher();
game.updateScore();
// console.log(this.y);
};

Player.prototype._goingUp = function(){
  //this.y = this.divPlayer.css("bottom");
  this.speedY -= this.gravity;
  this.y += this.speedY;
  this.divPlayer.css("bottom", this.y +"px");
};
