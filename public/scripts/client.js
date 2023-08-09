/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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
            <p class="tweet-date"> ${tweetObj.created_at} </p>
            <p class="icons"> 
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i> </p>
          </footer>
        </article>
  `)
  return $tweet;
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