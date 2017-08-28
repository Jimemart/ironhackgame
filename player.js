function Player(x,y,speedY, speedX, gravity){
  this.x = x;
  this.y = y;
  this.speedY = speedY;
  this.speedX = speedX;
  this.isFloor = true;
  this.gravity = gravity;
  this.divPlayer = $("#player");
}


Player.prototype.createPlayer = function(){
  var me = $("<div>");
  $(me).addClass("me");
  $(me).attr("id","player");
  $(me).css("left", this.x);
  $(me).css("bottom",this.y);
  return me;
};

//
// Player.prototype.moveUp = function(){
//   if(this.isFloor){
//     this.speedY = 30;
//     this.isFloor = false;
//   }
// };

Player.prototype.update = function(){
  if(game.keyRight){
    this.speedX = 10;
    this.x += this.speedX;
    $("#player").css("left", this.x);
  }
  if(game.keyLeft){
    this.speedX = -10;
    this.x += this.speedX;
    $("#player").css("left", this.x);
  }

};

Player.prototype.goingUp = function(){
  this.speedY -= this.gravity;
  this.y += this.speedY;
  $("#player").css("bottom", this.y +"px");
};
