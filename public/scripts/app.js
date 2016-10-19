
function loadTweets(){
  var tweetData = $.ajax({
    url: "/tweets/",
    method: "GET",
    dataType: 'json'
  });
  tweetData.done(function(tweetDataObj){
    renderTweets(tweetDataObj);
  })
}

$(function(){
   var tweetData = $.ajax({
    url: "/tweets/",
    method: "GET",
    dataType: 'json'
  });
  tweetData.done(function(tweetDataObj){
    for(var i = tweetDataObj.length-1; i >= 0; i--){
      var $tweet = createTweetElement(tweetDataObj[i]);
      $('#tweets-container').append($tweet);
    }
  });
});

function clearField() {
   document.getElementsByName("text")[0].value = "";
 }


function renderTweets(tweets) {
  var $tweet = createTweetElement(tweets[tweets.length-1]);
  $('#tweets-container').prepend($tweet);
}

function createTweetElement(tweet){
  var date = new Date(tweet.created_at)

  var a = $("<article>").addClass("tweets");
  var h = $("<header>");
  var t = $("<h2>")
  var i = $("<image src =" + tweet.user.avatars.small+">").addClass("logo");
  var s = $("<span>");
  var f = $("<footer>");
  var p = $("<p>");
  s.append(tweet.user.handle);
  t.append(tweet.user.name);
  h.append(i, t, s);
  f.append(date);
  p.append(tweet.content.text);
  a.append(h,p,f);
  return a;
};

$(function(){
  $('#new-tweet').on('submit', function(event){
    // console.log('gee');
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