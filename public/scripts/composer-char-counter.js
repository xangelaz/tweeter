const charLimit = 140;

// character counter function 
$(document).ready(function() {
  const charCounter = $('.counter')[0];
  charCounter.value = charLimit;

  // add or remove red-counter class if textarea length is greater charLimit
  $('#tweet-text').on('input', function() {
    charCounter.value = charLimit - this.value.length;
    if (charCounter.value < 0) {
      $('.counter').addClass('red-counter');
    } else {
      $('.counter').removeClass('red-counter');
    }
  });
});