const createTweetElement = function(tweet) {

  // const tweetDate = ${tweet.created_at};
  // const today = Date.now();

  // const diff = (today.getSeconds() - tweetDate.getSeconds());
  // const timeSince = Math.floor(diff - 24 * 60 * 60 * 1000)


  const $tweet = `
  <article class="tweet">
    <header class="tweet-header">
    <div class="tweet-avatar">
      <img src=${tweet.user.avatars}
      <span>${escape(tweet.user.name)}</span>
      </div>
      <span class="username">${escape(tweet.user.handle)}</span>
    </header>
    <div class="aboveBorder">${escape(tweet.content.text)}</div>
    <footer>
      <span class="timestamp">${tweet.created_at}</span>
      <span class="actions">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>`;
 
  return $tweet;
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};


const submitWithAjax = function() {
  const $form = $("form");
  $form.submit(function(event) {
    console.log("form");
    event.preventDefault();

    const textarea = $(this).find("#tweet-text");
    const text = textarea.val();
    const length = textarea.val().length;
    // const counter = $(this).find(".counter");

    $(".errorempty").slideUp(1000);
    $(".errorlong").slideUp(1000);

    if (text === "" || text === null) {
      $(".errorempty").slideDown(1000);
    } else if (length > 140) {
      $(".errorlong").slideDown(1000);
    } else {
      $.ajax('/tweets/', {method: 'POST', data: $(this).serialize()})
        .then(function() {
          console.log("Success");
          loadTweets();
          $('#tweet-text').val("");
          $(".counter").val("140");
        });
    }
  });
};

const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets/',
  })
    .then((result) => {
      console.log(result);
      renderTweets(result);
    });
};




$(document).ready(function() {
  loadTweets();
  submitWithAjax();
});
