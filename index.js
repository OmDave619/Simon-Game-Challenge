// alert("fine")
var level=1;
var gamePattern = []
var buttonColors=["red","blue","green","yellow"]
var index=0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
}

$(document).keydown(function() {
    game();       
})


function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function pressGlow(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

//does work for every new level
function game() {
    
    $(document).off("keydown"); // Remove the keydown event binding
    $("h1").text("Level "+ level)
    nextSequence();
    var last = gamePattern.length-1;
    pressGlow(gamePattern[last]);
    playSound(gamePattern[last]);
    waitForResponse();

}

function waitForResponse() {
    $(document).off("keydown"); // Remove the keydown event binding
    $(".btn").off("click").on("click",(function(event) {
        
        playSound(event.target.id);
        pressGlow(event.target.id);
        
        if(event.target.id === gamePattern[index]){
            index++;            
            //correct response registered/level up
            if(index === gamePattern.length){
                setTimeout(function(){
                    level++;
                    index=0;
                    game();
                },1000);
            }
            else{
                setTimeout(function(){waitForResponse();},1000);
            }
        }  
        else{
            gameover();
        }  
    }))
}

function gameover() {
    
    //change h1 text
    $("h1").text("Game Over, Press Any Key to Restart");

    //change backgroundcolor
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);

    //play wrong sound
    playSound("wrong");

    level = 1;
    gamePattern=[];
    index=0;
    
    $(document).off("keydown").on("keydown",(function() {
        game();       
    }))
}