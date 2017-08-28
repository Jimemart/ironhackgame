
var player;
var keys = {};
$(document).ready(function(){

  $("#start").on("click",function(){
    player = new myPlayer(350,0,10,10);
    game = new Game();
    game.renderPlayer();
    var myInterval = setInterval(function(){

      checkControls();
    },40);
  });

  $(document).keydown(function(e){
    keys[e.keyCode] = true;
  }).keyup(function(e){
    delete keys[e.keyCode];
  });

  function checkControls(){
    if(keys[39]){
      player.moveRight();
    }
    if(keys[37]){
      player.moveLeft();
    }
  }

});
