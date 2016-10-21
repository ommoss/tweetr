//loads initail tweets from database
$(function(){
   var tweetData = $.ajax({
    url: "/tweets/",
    method: "GET",
    dataType: 'json'
  });
  tweetData.done(function(tweetDataObj){
    for(var i = 0; i < 10; i++){
      var $tweet = createTweetElement(tweetDataObj[i]);
      $('#tweets-container').append($tweet);
    }
  });
});

//loads new tweets
function loadTweets(data){
  var tweetData = $.ajax({
    url: "/tweets/",
    method: "GET",
    dataType: 'json'
  });
  tweetData.done(function(tweetDataObj){
    renderTweets(tweetDataObj);
  });
  //renderTweets[data];
}

//clears the textarea after uploading the tweet
function clearField() {
  document.getElementsByName("text")[0].value = "";
  document.getElementsByClassName("counter")[0].innerHTML = 140;
  document.getElementsByClassName("counter")[0].style.color = "";
  document.getElementsByClassName("tweets")[9].remove();
 }

//puts the into the page
function renderTweets(tweets) {
  var $tweet = createTweetElement(tweets[0]);
  $('#tweets-container').prepend($tweet);
}

//creates the article for tweets
function createTweetElement(tweet){
  var date = Math.floor((Date.now() - tweet.created_at)/8.64e+7);
  var a = $("<article>").addClass("tweets");
  var h = $("<header>");
  var t = $("<h2>")
  var i = $("<image src =" + tweet.user.avatars.small +">").addClass("logo");
  var s = $("<span>");
  var f = $("<footer>");
  var p = $("<p>");
  s.append(tweet.user.handle);
  t.append(tweet.user.name);
  h.append(i, t, s);
  f.append(date, " days ago");
  p.append(tweet.content.text);
  a.append(h,p,f);
  return a;
};
//starts the upload tweet system
$(function(){
  $('#new-tweet').on('submit', function(event){
    event.preventDefault();
    const thisFrom = $(this);
    var newTweet = $.ajax({
      url: thisFrom.attr('action'),
      method: thisFrom.attr('method'),
      data: thisFrom.serialize(),
    });
    newTweet.done(function(data){
      loadTweets(data);
      clearField();
    });
  });
});

// Makes the compose button hide and show the new-tweet box
$(".compose").click(function(){
  $(".new-tweet").slideToggle("fast","linear",function(){
    $("textarea[name=text]").focus();
  });
});