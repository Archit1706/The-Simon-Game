var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function (event) {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    } 
});

$(".btn").click(function (event) {
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // level += 1;
    // $("h1").text("level " + level)
} 



function playSound(name) {
    var sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }        
    }
    else {
        // console.log("Wrong")
        playSound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
    
    // console.log(userClickedPattern);
    // console.log(gamePattern);
}