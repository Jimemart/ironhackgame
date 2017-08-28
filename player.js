function myPlayer(x,y,speedY, speedX){
  this.x = x;
  this.y = y;
  this.speedY = speedY;
  this.speedX = speedX;
}


myPlayer.prototype.createPlayer = function(){
  var me = $("<div>");
  $(me).addClass("me");
  $(me).attr("id","player");
  $(me).css("left", this.x);
  $(me).css("bottom",this.y);
  return me;
};


myPlayer.prototype.moveRight = function(){
  if(this.x < (game.width-$("#player").width())){
  this.x += this.speedX;
  $("#player").css("left", this.x + "px");}
};

myPlayer.prototype.moveLeft = function(){
  if(this.x > 0){
  this.x -= this.speedX;
  $("#player").css("left", this.x + "px");
}
};
