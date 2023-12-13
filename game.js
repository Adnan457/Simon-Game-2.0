// Wait for the DOM to be ready
$(document).ready(function () {
  var gamePattern = [];
  var userClickedPattern = [];
  var buttonColors = ["red", "blue", "green", "yellow"];
  var level = 0;
  var started = false;

  // Function to start the game
  function startGame() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }

  // Function to handle button clicks
  $(".btn").click(function () {
    if (started) {
      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      playSound(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
    }
  });

  // Function to play sound
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  // Function to animate button press
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  // Function to check user's answer
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Your Score is: " + (level - 1) + ". Press Any Key to Restart");

      // Reset the game after a delay
      setTimeout(function () {
        $("body").removeClass("game-over");
        $("#level-title").text("Press A Key to Start");
        startOver();
        $("#start-btn").show(); // Show the start button after resetting the game
      }, 2000);
    }
  }

  // Function to restart the game
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }

  // Function to generate the next sequence
  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColor);
  }

  // Start the game on key press
  $(document).on("keydown", function () {
    startGame();
  });

  // Start the game on button click
  $("#start-btn").click(function () {
    startGame();
    $("#start-btn").hide(); // Hide the start button after starting the game
  });
});
