function BonusObjects(){
  this.type = ["jetpack", "heart", "potion"];
  this.maxLeft = $("#board").width()-40;
  this.allExtras = $(".extra");
  this.speed = 12;
}


BonusObjects.prototype.randomType = function(){
  return Math.floor(Math.random()*this.type.length);
};

BonusObjects.prototype.randomLeft = function(){
  return Math.floor(Math.random()*this.maxLeft);
};

BonusObjects.prototype.createObject = function(){
  this.newBonus = $("<div>").addClass(this.type[this.randomType()] + " extra")
          .css("left",this.randomLeft())
          .css("bottom",800);
  $("#board").append(this.newBonus);
  this.allExtras = $(".extra");
};

BonusObjects.prototype.bonusGoDown = function(){
  var that = this;
  this.allExtras.each(function(){
    var position = parseInt($(this).css("bottom"));
    position -= that.speed;
    $(this).css("bottom",position);
  });
};

BonusObjects.prototype.speedUp  = function(){

};
BonusObjects.prototype.jetpackEffect = function(){
  if(player.y<400){
  tiles.tilesGoDown();
}
  player.speedY = 0;
  player.gravity = 0;
  tiles.speed = 50;
  game.backgroundSpeed = 8;
  game.score += 200;
};
BonusObjects.prototype.checkCollision = function(){
  var collide = $(".me").collision(".jetpack");
    if(collide[0]){

      $(collide).css("display","none");
      this.jetpackEffect();

      setTimeout(function(){
        bonus.resetToNormal();
      },2000);
    }
  var collideHearts = $(".me").collision(".heart");
  if(collideHearts[0]){
    $(collideHearts).css("display","none");
    this.heartsEffect();
  }
  var collidePotion = $(".me").collision(".potion");
  if(collidePotion[0]){
    $(collidePotion).css("display","none");
    this.potionEffect();
  }
};
BonusObjects.prototype.potionEffect = function(){
  player.poisoned = true;
  setTimeout(function(){
    player.poisoned = false;
    // $("#player").css("background","url('img/goat-jump.png')");
  },5000);
};
BonusObjects.prototype.heartsEffect = function(){
  if(game.lives <3)
  game.lives +=1;
  switch(game.lives){
    case 1:
    $(".mylife1").css("display","inline-block")
                .addClass("life");
    break;
    case 2:
    $(".mylife2").css("display","inline-block")
                  .addClass("life");
    break;
    case 3:
    $(".mylife3").css("display","inline-block")
                  .addClass("life");
    break;
  }
  game.hearts = $(".life");
};
BonusObjects.prototype.resetToNormal = function(){
    player.speedY = 30;
    player.gravity = 2;
    tiles.speed = 13;
    game.backgroundSpeed = 2;
};
BonusObjects.prototype.destroyUs = function(){
  this.allExtras.each(function(){
    if(parseInt($(this).css("bottom"))<=0){
      $(this).remove();
    }
  });
};
