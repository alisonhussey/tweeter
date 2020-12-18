const createTweetElement = function(tweet) {
  const $tweet = `
  <article class="tweet">
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

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $tweet = createTweetElement(tweet)
    $('#tweets-container').append($tweet);
    //empty out tweets-container
  } 
}


const submitWithAjax = function() {
  const $form = $('form')
$form.submit(function (event) {
  console.log("form")
  event.preventDefault()

  const textarea = $(this).find("#tweet-text")

  const text = textarea.val();
  const length = textarea.val().length;

  if (text === "" || text === null) {
    alert("Tweet Empty");
  } else if (length > 140) {
    alert("Tweet must be under 140 characters");
  } else {
    $.ajax('/tweets/', {method: 'POST', data: $(this).serialize()})
  .then(function() {
    console.log("Success");
  })
  }
})
}

const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets/',
  })
  .then((result) => {
    console.log(result);
    renderTweets(result);
  })
  // .catch((err) => console.log(err));

}


$(document).ready(function() {



loadTweets();

submitWithAjax();



});
