/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //test data
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('.tweet-container').prepend(createTweetElement(tweet));
    }
  };
  
  const createTweetElement = function(tweetObj) {
    let userInfo = tweetObj.user;
    let $tweet = $(`
      <section class="tweet-container">
        <article class="tweet">
          <header>
            <p class="name"> <img class="name" src="${userInfo.avatars}"> ${userInfo.name} </p>
            <p class="username"> ${userInfo.handle} </p>
          </header>
            <p class="tweet-content"> ${tweetObj.content.text} </p>
          <footer>
            <p class="tweet-date"> ${tweetObj.created_at} </p>
            <p class="icons"> 
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i> </p>
            </footer>
        </article>
      </section>
    `)
    return $tweet;
}
  renderTweets(data);
});