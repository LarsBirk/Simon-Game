var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var isStarted = false;

var level = 0;




$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function() {
  if (!isStarted) {
    nextSequence();
    isStarted = true;
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];


  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Sucess");
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
      startOver();
    }
  };

  function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isStarted = false;
  }

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

  }

  function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
      $("." + currentColour).removeClass('pressed');
    }, 100);
  }
