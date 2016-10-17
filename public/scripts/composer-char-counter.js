var i = 140;
$("textarea").ready(function(){
  $("input").keypress(function(){
    $("span").text(i -= 1);
  });
});