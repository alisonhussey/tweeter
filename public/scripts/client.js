
$(document).ready(function() {

const tweetData = {
    "user": {
      "name": "Alison",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

const createTweetElement = function(tweet) {
  console.log(tweet.user)
  const $tweet = `<article class="tweet">
  <header>
    <span><img src=${tweet.user.avatars}<span>${tweet.user.name}</span></span>
    <span class="username">${tweet.user.handle}</span>
  </header>
  <div class="aboveBorder">${tweet.content.text}</div>
  <footer>
    <span class="timestamp">${tweet["created_at"]}</span>
    <span class="actions">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </span>
  </footer>
</article>`;
 
  return $tweet;
}



const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').html("").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});