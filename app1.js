const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//let us create the unit
let box = 32;

//load background image
const ground = new Image();
ground.src = "img/ground.png";

//load food image 
const foodImg = new Image();
foodImg.src = "img/food.png";

//load all the audio files
const dead = new Audio();
dead.src = "audio/dead.mp3";

const eat = new Audio();
eat.src = "audio/eat.mp3";

const up = new Audio();
up.src = "audio/up.mp3";

const down = new Audio();
down.src = "audio/down.mp3";

const left = new Audio();
left.src = "audio/left.mp3";

const right = new Audio();
right.src = "audio/right.mp3";

//create a snake
let snake = [];
snake[0] = {
    x : 9*box,
    y : 10*box
}
console.log(snake);

//create a food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

console.log(food);
//console.log(x,y);

//write a function for arro keys
let d;

document.addEventListener("keydown", direction);
function direction(e){
    let key = e.keyCode;
    if( (key == 37 && d != "RIGHT") || (key == 65 && d != "RIGHT") ){
        left.play();
        d = "LEFT";
    }
    if( (key ==38 && d != "DOWN") || (key == 87 && d != "DOWN") ){
        d = "UP";
        up.play();
    }
    if( (key ==39 && d != "LEFT") || (key == 68 && d != "LEFT") ){
        d = "RIGHT";
        right.play();
    }
    if( (key ==40 && d != "UP")|| (key == 83 && d != "UP") ){
        d = "DOWN";
        down.play();
    }
}

let score = 0;

//collision (when snake's head intersect with it's own body)
function collision(head, snakeArr){
    for(i =0; i<snakeArr.length; i++){
        if(head.x == snakeArr[i].x && head.y == snakeArr[i].y){
            return true;
        }
    }
}
let highScore1 = 0;
let firstScore1 = 0;
highScore1 = localStorage.getItem('firstScore1');
console.log(highScore1);

function draw(){
    ctx.drawImage(ground,0,0);
    //snake is created using canvas rectangle 
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "#2dfd4b";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);

    //store X and Y co-ordinates of snake's head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //making movement of the snake upon pressing the arrow keys
    if( d == "LEFT") {
         snakeX -= box;
        }
    if(d == "UP") {
        snakeY -= box;
    }
    if(d == "RIGHT") {
        snakeX += box;
    }
    if(d == "DOWN") {
        snakeY += box;
    }

    //score update when snake eat's food
    if(food.x == snake[0].x && food.y == snake[0].y)
    {
        score++;
        eat.play();
        //we are going to change the position of the food once it is being eaten
        food = {
                x : Math.floor(Math.random()*16+1) * box,
                y : Math.floor(Math.random()*14+3) * box
            }
        //do not remove the tail
    }
   else{
       //remove the tail
       snake.pop();
   }

    //add new head in order to make movement
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    //game over
    if(snakeX < box || snakeX > box*17 || snakeY < box*3 || snakeY > box*17 ){
        clearInterval(game);
        dead.play();
        if(highScore1 < score){
            highScore1 = score;
            console.log(highScore1);
            console.log(score);
            localStorage.setItem("firstScore1", highScore1);
        }
}

    //display the score
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);


    ctx.fillStyle = "white";
    ctx.font = "40px Changa one";
    ctx.fillText(highScore1,17*box,1.6*box);

  
}

let game = setInterval(draw,200);

function restart(){
    document.location.href = "";
}
