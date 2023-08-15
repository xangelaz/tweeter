/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // loads all tweets to tweet-container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.tweet-container').prepend(createTweetElement(tweet));
    }
  };

  // secure input handling to prevent XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // obtains user info and tweet content 
  const createTweetElement = function(tweetObj) {
    const userInfo = tweetObj.user;
    const $tweet = $(`
      <article class="tweet">
        <header>
          <p class="name"> <img class="name" src="${userInfo.avatars}"> ${userInfo.name} </p>
          <p class="username"> ${userInfo.handle} </p>
        </header>
          <p class="tweet-content"> ${escape(tweetObj.content.text)} </p>
        <footer>
          <p class="tweet-date"> ${timeago.format(tweetObj.created_at)} </p>
          <p class="icons"> 
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i> </p>
          </footer>
      </article>
    `)
    return $tweet;
  }

  // form validation and loading of tweets upon clicking tweet button
  $('form').on('submit', function(event) {
    event.preventDefault();
    const serializedTweet = $(this).serialize();

    const tweetText = $('#tweet-text').val();
    const $emptyErrorMessage = $(`
      <p> 
      <i class="fa-solid fa-triangle-exclamation"></i>
      Cannot post empty tweet
      <i class="fa-solid fa-triangle-exclamation"></i>
      </p>
      `)
    const $charsErrorMessage = $(`
      <p> 
      <i class="fa-solid fa-triangle-exclamation"></i>
      Tweet cannot exceed 140 characters
      <i class="fa-solid fa-triangle-exclamation"></i>
      </p>
    `)

    // form validation - checking for empty tweet
    if (tweetText == null || tweetText == '') {
      // if empty, error message slides down
      $('#error-message').html($emptyErrorMessage).slideDown( "slow", function() {

      });
    } 

    // form validation - checking if tweet is too long 
    else if (tweetText.length > 140) {
      //if limit exceeded, error message slides down
      $('#error-message').html($charsErrorMessage).slideDown( "slow", function() {
      });

      // loads tweets when there are no errors and slides up any existing error messages
    } else {
      $.post('/tweets', serializedTweet, () => {
        $('#error-message').slideUp();
        loadTweets();
      });
    }
  });

  // tweets load to the page without needing to refresh the page
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };

  loadTweets()

  // stretch - form toggle feature code below

  const $tweetContainer = $(`
  <section class="new-tweet">
    <h2>Compose Tweet</h2>
    <form method="POST" action="/tweets">
      <label for="tweet-text">What are you humming about?</label>
      <textarea name="text" id="tweet-text"></textarea>
      <div>
        <button type="submit">Tweet</button>
        <output name="counter" class="counter" for="tweet-text"></output>
      </div>
    </form>
    <div id="error-message">
    </div>
  </section>
  `)

});

// hides new-tweet-container immediately as page loads
$(document).ready(function() {
  $('#new-tweet-container').slideToggle( 0, function() {
  });
});

// toggles the new-tweet-container once the "Write a new tweet" button is clicked
const toggleDisplay = function() {
  $('#new-tweet-container').slideToggle( "slow", function() {
  });
}