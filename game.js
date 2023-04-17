var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started) {
        $("#level-title").text("level "+ level);
        nextSequence();
        started = true;
    };
});

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");    
    userClickedPattern.push(userChosenColor);

    var index = userClickedPattern.length-1;

    playSound(userChosenColor);
    animatePress (userChosenColor);

    checkAnswer(index);
});

function checkAnswer(currentLevel){

    var lastAnswer = userClickedPattern[currentLevel];

    if(lastAnswer === gamePattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }else{

        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        wrongSound();
        startOver()
    }
}


function nextSequence() {
    
    userClickedPattern = [];// reset the userClickedPattern to an empty array

    level++;
    $("#level-title").text("level "+ level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function wrongSound() {
    var audio = new Audio ("sounds/wrong.mp3");
    audio.play();
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

