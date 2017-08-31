function Rocks(){
  this.width = [100,150,200];
  this.speed = -15;
  this.left = [0, 100, 200, 300, 400,500];
  this.maxHeight = $("#board").height();
}

Rocks.prototype.pickRandom = function(list){
  var max = list.length -1;
  return Math.floor(Math.random()*max);
};

Rocks.prototype.createRock = function(){
  this.newRock = $("<div>").addClass("rock")
                            .css("width", this.width[pickRandom(this.width)])
                            .css("left", this.left[pickRandom(this.left)])
                            .css("bottom", this.maxHeight);
  var rockwidth = parseInt($(this.newRock).width());
  switch(rockwidth){
    case 100:
    this.newRock.css("background-image", "url('img/rock3.png')");
    break;
  }

};
