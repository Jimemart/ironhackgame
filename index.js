
var player;

$(document).ready(function(){

  $("#start").on("click",function(){
    tiles = new Tile();
    player = new Player(350,40,0,0,2);
    game = new Game();

    var myInterval = setInterval(function(){
      player.update();
    },30);
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
    if(e.keyCode===38 ){
      game.keyJump = false;
      player.isFloor = false;
    }
    if(e.keyCode===39){
      game.keyRight = false;
      player.speedX = 0;
    }
    if(e.keyCode===37){
      game.keyLeft = false;
      player.speedX = 0;
    }
  });
