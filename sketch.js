const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;
var gameState;
var gameState="onSling";
var score;
 score=0;

var overlay,overlaySize;
var star1,star2,star3;
var star1y, star2y,star3y;

var counter;

function preload() {
    getTime();
   overlay=loadImage("sprites/Overlay.png");
   star1=loadImage("sprites/star.png");
   star2=loadImage("sprites/star1.png");
   star3=loadImage("sprites/star2.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    window.score=0;

    counter=0;


    overlaySize=1;
    star1y=800;
    star2y=800;
    star3y=800;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);

    pig1 = new Pig(810, 350);
    pig2 = new Pig(750, 350);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);
    log1 = new Log(810,260,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    else{
        background("white");
    }



    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    

    if(mouseIsPressed){
        if(mouseX>=0 && mouseX<200 && gameState === "onSling"){
            Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
        }
    }

    //draw overlay
    if(gameState === "launched"){
        if(overlaySize<100){
            overlaySize++
        }
        image(overlay,600-overlaySize*6,200-overlaySize*2,overlaySize*12,overlaySize*4)
    }
    //displaying score
    textSize(12)
    text("SCORE : "+ window.score,900,30);
    

    //draw the stars
    imageMode(CENTER)
    image(star1,450,star1y,50,50);
    image(star2,500,star2y,50,50);
    image(star3,550,star3y,50,50);
    imageMode(CORNER);
    if(gameState === "launched"){
        if(window.score>=0 && star1y >200){
            star1y = star1y-6;
        }   
        if(window.score>=200 && star2y >180){
            star2y = star2y-5;
        } 
        if(window.score>=100 && star3y >200){
            star3y = star3y-6;
        }   
    }
    //draw blinking text
    counter++
    if(star1y<=200 && counter > 30){
        textSize(30)
        text(" PRESS SPACE TO RESET ! ",400,100);
    }
    if(counter>60){
        counter=0;
    }
}

function mouseReleased(){
    slingshot.fly();
    gameState="launched";
}

function keyPressed(){
    if(keyCode === 32 && gameState === "launched" && star1y <=200){
        window.location.reload();
    }
}

async function getTime(){
var response = await fetch ("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
var responseJson = await response.json()
var dateTime = responseJson.datetime;
//console.log(responseJson);

var hour = dateTime.slice(11,13)
console.log(hour);

if (hour>=08 && hour<=16){
    bg="sprites/bg.png"
}
else{
    bg="sprites/bg2.jpg"
}
backgroundImg = loadImage(bg)
}