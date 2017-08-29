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
      }
    this.speedY = 30;
    this.isFloor = false;

  }
  }
  if(!this.isFloor){
      this.isFloor = false;
    this._goingUp();
    if(player.y >=450){

      tiles.tilesGoDown();

    }
  }
  if(this.speedY <=0){
    this.isFloor = false;
    var that = this;
    tiles.alltiles.each(function(){
      if(tiles.checkOnTile(that, $(this))){
        this.y = $(that.divPlayer).css("bottom");
        $(that.divPlayer).css("bottom", $(this).css("bottom")+ "px");
        that.isFloor = true;
        that.speedY = 0;
      }
    });
  }

};

Player.prototype._goingUp = function(){
  //this.y = this.divPlayer.css("bottom");
  this.speedY -= this.gravity;
  this.y += this.speedY;
  this.divPlayer.css("bottom", this.y +"px");
};
