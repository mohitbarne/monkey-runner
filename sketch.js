
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime
var invisibleGround
var ground
var eat=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
}



function setup() {
createCanvas(500,300);  

  //creating background
  ground = createSprite(300,200,600,600);
  ground.addImage(groundImage);
  ground.scale = 3
  ground.velocityX=-4;


  
  //creating monkey
  monkey = createSprite(80,260,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  invisibleGround = createSprite(10,280,1000,10);
  
  obstaclesGroup=new Group()
  FoodGroup=new Group()
  
}

function draw() {
background("green");
  survivalTime=Math.ceil(frameCount/60)
  
  if(ground.x<200){
    ground.x=300
  }
  
  // moving ground
    ground.velocityX = -3 

    
  
   //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
   //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -12;
    }
   
  
  
  spawnObstacles()
  spawnBananas()
  
  
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach()
    eat=eat+1
  }
  
  
  
  
  drawSprites()
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+survivalTime, 100,50);
  text("bananas Eaten:"+eat,100,80)
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,260,10,40);
    //obstacle.debug = true;
    
    obstacle.velocityX = -(6);
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);
              
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function spawnBananas() {
  //write code here to spawn the Bananas
  if (frameCount % 100 === 0) {
    var Bananas = createSprite(600,120,40,10);
    Bananas.y = Math.round(random(120,140));
    Bananas.addImage(bananaImage);
    Bananas.scale = 0.09;
    Bananas.velocityX = -3;
    
     //assign lifetime to the variable
    Bananas.lifetime = 200;
    
    //add each cloud to the group
    FoodGroup.add(Bananas);
  }
  
}



