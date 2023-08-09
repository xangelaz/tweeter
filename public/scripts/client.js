/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const createTweetElement = function(tweetObj) {
  let $tweet = $(`
    <article class="tweet">
          <header>
            <p class="name"> <img class="name" src="${tweetObj.user.avatars}"> ${tweetObj.user.name} </p>
            <p class="username"> ${tweetObj.user.handle} </p>
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
  `)
  return $tweet;
  //should return a tweet <article> element containing the entire HTML structure of the tweet
}

// const $tweet = $(`<article class="tweet">test</article>`);


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}


const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});