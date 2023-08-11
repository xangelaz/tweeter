/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('.tweet-container').prepend(createTweetElement(tweet));
    }
  };
  
  const createTweetElement = function(tweetObj) {
    let userInfo = tweetObj.user;
    let $tweet = $(`
      <article class="tweet">
        <header>
          <p class="name"> <img class="name" src="${userInfo.avatars}"> ${userInfo.name} </p>
          <p class="username"> ${userInfo.handle} </p>
        </header>
          <p class="tweet-content"> ${tweetObj.content.text} </p>
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

  // renderTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
    let serializedTweet = $(this).serialize();

    $.post('/tweets', serializedTweet, () => {
      console.log('Success: ', serializedTweet); //remove later
    })
  });

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

});