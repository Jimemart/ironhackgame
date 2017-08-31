function Rocks(){
  this.width = [100,200];
  this.speed = 15;
  this.left = [0, 100, 200, 300, 400,500];
  this.maxHeight = $("#board").height();
  this.allRocks = $(".rock");
}

Rocks.prototype.pickRandom = function(list){
  var max = list.length;
  return Math.floor(Math.random()*max);
};

Rocks.prototype.createRock = function(){
  this.newRock = $("<div>").addClass("rock")
                            .css("width", this.width[this.pickRandom(this.width)])
                            .css("left", this.left[this.pickRandom(this.left)])
                            .css("bottom", this.maxHeight);
  var rockwidth = parseInt($(this.newRock).width());
  switch(rockwidth){
    case 100:
    this.newRock.css("background-image", "url('img/rock3.png')");
    break;
    case 200:
    this.newRock.css("background-image", "url('img/rock1.png')");
    break;
  }
  console.log($(this.newRock).width());
  $("#board").append(this.newRock);
  this.allRocks = $(".rock");

};
Rocks.prototype.rocksGoDown = function(){
  var that = this;
  this.allRocks.each(function(){
    var position = parseInt($(this).css("bottom"));
    position -= that.speed;
    $(this).css("bottom", position);
  });

};
Rocks.prototype.disappear = function(){
  this.allRocks.each(function(){
    if(parseInt($(this).css("bottom")) < 0){
      $(this).remove();
    }
  });
};
Rocks.prototype.checkCollision = function(){
  var rockCollision = $(".me").collision(".rock");
  if(rockCollision[0]){
    if(game.lives > 0){
      game.rescue();
    }
    else{
      game.restart();
    }
  }
};
