
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var days, hours, months,years;
var gamestate = "start";
var x = 50;
var ground;
var forest,farest;
var BG,OG;
var hunger = 20;
var GO,GOI;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  farest = loadImage("forest.webp");
    GOI = loadImage("GOver.webp");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400);
  BG = createGroup();
  OG = createGroup();

  ground = createSprite(200,375,400,4);
  days = 0;
  hours = 0;
  months = 0;
  years = 0;
    monkey = createSprite(50,350,0,0);
monkey.addAnimation("blah",monkey_running);
  monkey.scale = 0.1;
  ground.visible = false;
  forest = createSprite(200,200,0,0);
  forest.addImage(farest);
  forest.scale = 1.8;
  monkey.depth = forest.depth +1
  forest.velocityX = -3;
}


function draw() {
  if(forest.x < -200){
    forest.x = 200;
  }
  if(gamestate === "play"&&frameCount%60 ===0){
    hunger = hunger-1;
  }
  if(hunger>20){
    hunger=20
  }
  if(hunger<1){
  gamestate = "end";
  }
  if(gamestate === "end"){
    GO = createSprite(175,200);
    
    GO.addImage(GOI);
    GO.scale = 0.7;
    GO.height = 400;
    GO.width = 400;

  }
  monkey.collide(ground);
  if(frameCount%x === 0){
  hours = hours +1;
  }
  if(gamestate === "start"){
    hours = 0;
    frameCount = 0;
    camera.position.x = monkey.x + 120;
    camera.position.y = monkey.y - 150;
  }
  if(hours>23){
    hours = 0;
    days = days +1;
  }
  if(days>29){
    days = 0;
    months = months +1;
  }
  if(months>11){
    months = 0;
    years = years +1;
  }
  if(keyIsDown(UP_ARROW)&&gamestate === "start"){
  x=x+1;
  }
  if(keyIsDown(DOWN_ARROW)&&gamestate === "start"){
  x=x-1;
  }
  if(keyIsDown(DOWN_ARROW)&&gamestate === "play"){
  monkey.velocityY = monkey.velocityY + 1;
  }
  if(keyIsDown(32)&&gamestate === "start"){
  gamestate = "play";
  }
  if(keyIsDown(32)&& gamestate === "play"&& monkey.y>329){
    monkey.velocityY = -16;
  }
  if(gamestate === "play"){
    monkey.velocityY = monkey.velocityY + 0.5 ;
  }
  if(x<1){
    x=1;
  }
  if(x>100){
    x=100;
  }
  if(gamestate === "play"&& frameCount%150===0){
    headache();
  }
  if(years === 1){
    var win1;
    var win = createSprite(200,200,0,0);
    win1 = loadImage("HIM.jpg")
    win.addImage(win1);
  }
  if(monkey.isTouching(OG)){
    OG.destroyEach();
  hunger = hunger-6;  
  }
  if(monkey.isTouching(BG)){
    BG.destroyEach();
    hunger = hunger + 5;
  }
  background(173,216,230);
  drawSprites();
  if(gamestate === "play"){text("Years:"+ years +"    " + "Months:" + months + "    " +"Days:"+ days +"    " + "Hours:" + hours,10,40);
                          }
  if(gamestate === "start"){
    textSize(35);
    text("Level:"+ x,240,50);
    
}
  if(gamestate === "play"){
    textSize(28);
    text("Hunger:"+ hunger,240,50);
    console.log(hunger);

}

camera.position.x = monkey.x + 120;
    camera.position.y = monkey.y - 150;
  }

function headache(){
  banana = createSprite(500,random(50,300));
  banana.addImage(bananaImage);
  banana.lifetime = 300;
  banana.scale = 0.07;
  banana.velocityX = random(-2,-4);
  obstacle = createSprite(500,350);
  obstacle.velocityX = -4;
  obstacle.addImage(obstacleImage);
  obstacle.lifetime = 300;
  obstacle.scale = 0.15;
  BG.add(banana);
  OG.add(obstacle);
  obstacle.setCollider("rectangle",0,0,300,300);
  
}




