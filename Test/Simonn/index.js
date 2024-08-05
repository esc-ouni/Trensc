
let Sound;

let Test = false;

let gamePattern = [];

let generated_buttons_index  = 0;
let pressed_buttons_index    = 0;

let buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){
    let randomNumber = Math.round(Math.random() * 10) % 4;
    return randomNumber;
}

$(".btn").on("click", function() {
    if (!Test){
        let color_pressed = $(this).attr("class").split(' ')[1];

        if (CheckButtonPressed(color_pressed, pressed_buttons_index)){
            pressed_buttons_index += 1;
            Sound = new Audio('./sounds/' + color_pressed + ".mp3");
            $(this).addClass("pressed");
            Sound.play();
            setTimeout(() => { $(this).removeClass("pressed"); }, 100);
            if (generated_buttons_index === pressed_buttons_index){
                Test = true;
                setTimeout(() => { playGamePattern(); }, 400);
                Test = false;
            }
        } else {
            Sound = new Audio('./sounds/wrong.mp3');
            $(this).addClass("pressed");
            Sound.play();
            setTimeout(() => { $(this).removeClass("pressed"); }, 100);
            // empty the array
            resetGame();
        }
    }
});

$(document).on("keydown", function() {
    if (!Test) {
        Test = true;
        setTimeout(() => { playGamePattern(); }, 400);
        Test = false;
    }
});

function playGamePattern() {
    gamePattern.push(buttonColours[nextSequence()]);
    generated_buttons_index += 1;
    $("." + gamePattern[generated_buttons_index - 1]).addClass("pressed");
    new Audio('./sounds/' + gamePattern[generated_buttons_index - 1] + ".mp3").play();
    setTimeout(() => { $("." + gamePattern[generated_buttons_index - 1]).removeClass("pressed"); }, 100);
    pressed_buttons_index = 0;
}

function CheckButtonPressed(buttonPressed, pressed_buttons_index){
    if (gamePattern[pressed_buttons_index] == buttonPressed)
        return true;
    else
        return false;
}

function resetGame(){
    gamePattern = [];
    pressed_buttons_index = 0;
    generated_buttons_index = 0;
    Test = false;
}
