$(document).ready(function() {

$("#instructions").on("click",function(){
  $("#first-instruction").css("display","block");
});
$("#next1").on("click",function(){
  $("#second-instruction").css("display","block");
});
$("#next2").on("click",function(){
  $("#third-instruction").css("display","block");
});
$("#next3").on("click",function(){
  $("#fourth-instruction").css("display","block");
});
$("#next4").on("click",function(){
  $("#fith-instruction").css("display","block");
});
$("#next5").on("click",function(){
  $(".instr").css("display","none");
});

});
