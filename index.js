
var player;

$(document).ready(function(){

  $("#start").on("click",function(){
    player = new myPlayer(350,20,0,10,2);
    game = new Game();
    game.renderPlayer();
    var myInterval = setInterval(function(){
      checkControls();
    },25);
  });
});
  $(document).keydown(function(e){
    if(e.keyCode === 38){
      game.keyJump = true;
    }
    if(e.keyCode === 39){
      game.keyRight = true;
    }
    if(e.keyCode === 37){
      game.keyLeft = true;
    }
  }).keyup(function(e){
    if(e.keyCode===38){
      game.keyJump = false;
    }
    if(e.keyCode===39){
      game.keyRight = false;
    }
    if(e.keyCode===37){
      game.keyLeft = false;
    }
  });

  function checkControls(){
    if(!player.isFloor){
      player.speedY -= player.gravity;
      player.y += player.speedY;
      console.log(player.y);
      $("#player").css("bottom", player.y + "px");
    }
    if(player.speedY <= 0){
      player.isFloor = false;
      $(".tile").each(function(){
        if(checkOnTile($(this)) && parseInt($(this).css("bottom")) >= player.y - $(this).height()){
          $("#player").css("bottom", $(this).css("bottom")+ "px");
          player.isFloor = true;
          player.speedY = 0;
        }
      });

    }
    if(game.keyJump){
      player.moveUp();
    }
    if(game.keyRight){
      player.moveRight();
    }
    if(game.keyLeft){
      player.moveLeft();
    }
  }
function checkOnTile(tilesToCheck){
  var resultX = false;
  if(player.x >= parseInt(tilesToCheck.css("left")) && player.x<= parseInt(tilesToCheck.css("left")) + tilesToCheck.width()){
    resultX = true;
  }
  else{
    resultX = false;
  }
  return resultX;
}
