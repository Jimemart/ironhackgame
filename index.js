var player;

$(document).ready(function() {
$("#start").on("click",function(){
  game = new Game();
  game.start();

  var myInterval = setInterval(function() {
    player.update();
    if (game.gameOver) {
      game.restart();
    }
  }, 30);
});



});

$(document).keydown(function(e) {
  if (e.keyCode === 38) {
    game.keyJump = true;
  }
  if (e.keyCode === 39) {
    game.keyRight = true;
  }
  if (e.keyCode === 37) {
    game.keyLeft = true;

  }
}).keyup(function(e) {
  if (e.keyCode === 38) {
    game.keyJump = false;
    player.isFloor = false;
  }
  if (e.keyCode === 39) {
    game.keyRight = false;
    player.speedX = 0;
  }
  if (e.keyCode === 37) {
    game.keyLeft = false;
    player.speedX = 0;

  }
});
