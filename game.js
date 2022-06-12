var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//detect when a keyboard key has been pressed for the first time
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {
  //store the id of the button that got clicked
  var userChosenColor = $(this).attr("id");
  //add the user's chosen color to the end of user's click pattern array
  userClickedPattern.push(userChosenColor);
  //play sound for user chosen color
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  //once nextSequence is triggered, reset the userClickedPattern to an empty array ready for next level
  userClickedPattern = [];
  //increase level by 1 every time nextSequence() is called and update title
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //select the button with the same id as the randomChosenColor and animate a flash to the button selected
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //play sound for random chosen color
  playSound(randomChosenColor);
}

function playSound(name) {
  //play the sound for the button color selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  //add a box shadow and change the background color to grey when button is pressed
  $("#" + currentColor).addClass("pressed");
  //remove the pressed class after 100 ms
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //play wrong.mp3 if the user got one of the answers wrong
    playSound("wrong");
    //apply "game-over" class to the body of the website when the user gets one of the answers wrong
    $("body").addClass("game-over")
    //remove "game-over" class after 200ms
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
