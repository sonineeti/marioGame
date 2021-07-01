var edges;
var marioSize = "small";
var marioDirection = "right";
var firePower = false;
var score = 0;
var lives = 3;
var gameState = "start";
var timer = 120;

function preload() {
  groundImg = loadImage("./images/scene/ground.png");
  cloud1img = loadImage("./images/scene/cloud01.png");
  cloud2img = loadImage("./images/scene/cloud02.png");
  brickImg = loadImage("./images/scene/brick.png");
  brick2Img = loadImage("./images/scene/brick2.png");
  coinbrickImg = loadAnimation("./images/scene/coinblock1.png");
  coinbrick2Img = loadAnimation("./images/scene/coinblock2.png");
  coinImg = loadImage("./images/scene/coin.png");
  mushroomBrickImg = loadAnimation("./images/scene/mushroomBrick1.png","./images/scene/mushroomBrick2.png");
  mountain1img = loadImage("./images/scene/mountains01.png");
  mountain2img = loadImage("./images/scene/mountains02.png");
  mountain3img = loadImage("./images/scene/mountains03.png");
  tube1img = loadImage("./images/scene/tubes01.png");
  tube2img = loadImage("./images/scene/tubes02.png");
  tube3img = loadImage("./images/scene/tubes03.png");
  cactusimg = loadAnimation("./images/enemy/cactus1.png","./images/enemy/cactus2.png");
  mushroomsimg = loadAnimation("./images/enemy/mushroom1.png","./images/enemy/mushroom2.png");
  deadMushroomImg = loadAnimation("./images/enemy/deadMushroom.png");
  turtleimg = loadAnimation("./images/enemy/turtleLeft1.png","./images/enemy/turtleLeft2.png","./images/enemy/turtleLeft3.png","./images/enemy/turtleLeft4.png",
  "./images/enemy/turtleRight1.png","./images/enemy/turtleRight2.png","./images/enemy/turtleRight3.png","./images/enemy/turtleRight4.png");
  deadTurtleImg = loadAnimation("./images/enemy/DeadTurtle.png");
  marioStandRight = loadAnimation("./images/mario/right.png");
  marioStandLeft = loadAnimation("./images/mario/left.png");
  marioWalkRight = loadAnimation("./images/mario/walk1.png","./images/mario/walk2.png","./images/mario/walk3.png");
  marioWalkLeft = loadAnimation("./images/mario/walkLeft1.png","./images/mario/walkLeft2.png","./images/mario/walkLeft3.png");
  marioJumpRight = loadAnimation("./images/mario/jump.png");
  marioJumpLeft = loadAnimation("./images/mario/jumpLeft.png");
  deadMarioImg = loadAnimation("./images/mario/die.png");

  fMarioStandRight = loadAnimation("./images/fireMario/right.png");
  fMarioStandLeft = loadAnimation("./images/fireMario/left.png");
  fMarioWalkRight = loadAnimation("./images/fireMario/walk1.png","./images/fireMario/walk2.png","./images/fireMario/walk3.png");
  fMarioWalkLeft = loadAnimation("./images/fireMario/walk1Left.png","./images/fireMario/walk2Left.png","./images/fireMario/walk3Left.png");
  fMarioJumpRight = loadAnimation("./images/fireMario/jump.png");
  fMarioJumpLeft = loadAnimation("./images/fireMario/jumpLeft.png");
  deadfMarioImg = loadAnimation("./images/fireMario/die.png");

  fireballimg = loadImage("./images/scene/fireball.png");
  flowerImg = loadAnimation("./images/scene/flower1.png","./images/scene/flower2.png");
  bigMushroomImg = loadImage("./images/scene/bigMushroom.png");
  gameOverImg = loadImage("./images/scene/gameover.jpg");
  restartIconImg = loadImage("./images/scene/restartIcon.png");
  princessImg = loadImage("./images/scene/princess.png");
  congratsImg = loadAnimation("./images/scene/congrats.png");

  themeSound = loadSound("./sounds/themeSong.mp3");
  coinSound = loadSound("./sounds/coin.wav"); 
  fireballSound = loadSound("./sounds/fireball.wav"); 
  jumpSound = loadSound("./sounds/jump.wav");
  hitBrickSound = loadSound("./sounds/hitBrick.wav");
  stompSound = loadSound("./sounds/stomp.wav"); 
  powerUpSound = loadSound("./sounds/powerup.wav"); 
  dieSound = loadSound("./sounds/marioDies.wav");
  winSound = loadSound("./sounds/win.wav");
  gameOverSound = loadSound("./sounds/gameover.wav");  


}

function setup() {
  createCanvas(1000,450);
  edges = createEdgeSprites();

  restartIcon = createSprite(30,30,10,10);
  restartIcon.addImage(restartIconImg);
  restartIcon.scale = 0.15;

  ground = createSprite(500,430,1000,20);
  ground.addImage(groundImg);
  ground.x=ground.width/2;

  mario = createSprite(500,377,50,50);
  mario.addAnimation("standRight",marioStandRight);
  mario.addAnimation("standLeft",marioStandLeft);
  mario.addAnimation("walkRight",marioWalkRight);
  mario.addAnimation("walkLeft",marioWalkLeft);
  mario.addAnimation("jumpRight",marioJumpRight);
  mario.addAnimation("jumpLeft",marioJumpLeft);
  mario.addAnimation("deadMario",deadMarioImg);
  
  //fire mario animation
  mario.addAnimation("fstandRight",fMarioStandRight);
  mario.addAnimation("fstandLeft",fMarioStandLeft);
  mario.addAnimation("fwalkRight",fMarioWalkRight);
  mario.addAnimation("fwalkLeft",fMarioWalkLeft);
  mario.addAnimation("fjumpRight",fMarioJumpRight);
  mario.addAnimation("fjumpLeft",fMarioJumpLeft);
  mario.addAnimation("fdeadMario",deadfMarioImg);
  mario.scale = 0.45;

  princess = createSprite(650,375,50,50);
  princess.addImage(princessImg);
  princess.scale = 0.75;
  princess.visible = false;

  gameover = createSprite(500,200,100,100);
  gameover.addImage(gameOverImg);
  gameover.scale = 1.5;
  gameover.visible = false;

  restart = createSprite(500,365,100,100);
  restart.addImage(restartIconImg);
  restart.scale = 0.25;
  restart.visible = false;

  brickGroup = new Group();
  cloudsGroup = new Group();
  mountainGroup = new Group();
  invBrickGroup = new Group();
  coinGroup = new Group();
  coinBrickGroup = new Group();
  invCoinBrickGroup = new Group();
  mushroomBrickGroup = new Group();
  invMushroomBrickGroup = new Group();
  bigMushroomGroup = new Group();
  tubeGroup = new Group();
  cactusGroup = new Group();
  turtleGroup = new Group();
  invTurtleGroup = new Group();
  mushroomGroup = new Group();
  invMushroomGroup = new Group();
  fireballGroup = new Group();
  flowerBrickGroup = new Group();
  invFlowerBrickGroup = new Group();
  flowerGroup = new Group();

  themeSound.loop();
  themeSound.setVolume(0.05);
}

function draw() {
  background("lightblue"); 

  //displaying timer, lives and score
  fill("white");
  textSize(18);
  textStyle(BOLD);
  text("LIVES: "+lives,770,30);
  text("SCORE: "+score,875,30);
  text("TIME: "+timer,80,30);

  //showing all the sprites
  drawSprites();
  
  //reload game if restart icon is clicked
  if(mousePressedOver(restartIcon)){
    location.reload();
  }

  //start State
  if(gameState === "start"){
    textSize(25);
    text("Press ENTER to start",400,220);
    
    //play if ENTER is pressed
    if(keyDown(ENTER)){
      mario.changeAnimation("walkRight",marioWalkRight);
      gameState = "play";
    }
  }

  //play State
  if(gameState === "play"){

    //timer calculation
    if(frameCount%60===0 && timer>0){
      timer--;
    }

    //ground moving left
    ground.velocityX = -1;

    //ground resetting
    if(ground.x<0){
      ground.x=ground.width/2;
    }  
  
    //gravity for mario
    mario.velocityY=mario.velocityY+0.8;

    //mario colliding with ground, tubes, canvas edges, and bricks
    mario.collide(ground);
    mario.collide(tubeGroup); 
    mario.collide(edges[0]);
    mario.collide(edges[1]);
    mario.collide(edges[2]);
    mario.collide(brickGroup);
    mario.collide(coinBrickGroup);
    mario.collide(mushroomBrickGroup);
  
    //functions of spawning multiple objects
    spawnClouds(); 
    spawnMountains();
    spawnTubes();
    spawnBricks();
    spawnCoins();
    spawnMushrooms();
    spawnTurtles();
    marioMovement();
    shootfireball();
    hittingBricks();
    killEnemies();
    marioDying();
  
    //objects bouncing off right edge
    mushroomGroup.bounceOff(edges[1]);
    invMushroomGroup.bounceOff(edges[1]);
    turtleGroup.bounceOff(edges[1]);

    //objects bouncing off tubes and cacti
    mushroomGroup.bounceOff(tubeGroup);
    invMushroomGroup.bounceOff(tubeGroup);
    invMushroomGroup.bounceOff(cactusGroup);
    turtleGroup.bounceOff(tubeGroup);
    invTurtleGroup.bounceOff(tubeGroup);
    invTurtleGroup.bounceOff(cactusGroup);

    //mushroom for powerup falling down and colliding with other objects
    bigMushroomGroup.setVelocityYEach(1.5);
    bigMushroomGroup.collide(ground);
    bigMushroomGroup.collide(tubeGroup);
    bigMushroomGroup.collide(brickGroup);
    bigMushroomGroup.collide(coinBrickGroup);
    mushroomBrickGroup.collide(brickGroup);
    invMushroomBrickGroup.collide(invBrickGroup);
    mushroomBrickGroup.collide(coinBrickGroup);
    invMushroomBrickGroup.collide(invCoinBrickGroup);

    //flower brick colliding with other bricks
    flowerBrickGroup.collide(brickGroup);
    invFlowerBrickGroup.collide(brickGroup);
    flowerBrickGroup.collide(coinBrickGroup);
    invFlowerBrickGroup.collide(invCoinBrickGroup);
    
    //mario size
    if(marioSize === "big"){
      mario.scale = 0.75;
    }
    else if(marioSize === "small"){
      mario.scale = 0.45;
    }

    //gameover
    if(lives === 0 || timer <= 0){
      gameOverSound.play();
      gameOverSound.setVolume(0.1);
      gameState = "end";
    }

    //win game
    if(score >= 2000){
      winSound.play();
      winSound.setVolume(0.1);
      gameState = "win";
    }
  }
  
  //reset State
  if(gameState === "reset"){
    text("Press B to Begin Again", 400, 220);

    if(keyDown("B")){
      reset();
    }
  }

  //end State
  if(gameState === "end"){
    endGame();
  }

  //win State
  if(gameState === "win"){
    winGame();
  }

}

function marioMovement(){

  // mario walking towards right
  if(keyDown(RIGHT_ARROW)){
    mario.changeAnimation("walkRight",marioWalkRight);
    mario.x = mario.x + 5;
    marioDirection = "right";

  }

  //mario walking towards left
  if(keyDown(LEFT_ARROW)){
    mario.changeAnimation("walkLeft",marioWalkLeft);
    mario.x = mario.x - 5;
    marioDirection = "left";
  }

  //mario jumping right
  if(keyWentDown(UP_ARROW) && marioDirection === "right"){
    mario.changeAnimation("jumpRight",marioJumpRight);
    mario.velocityY = -8;
    jumpSound.play();
    jumpSound.setVolume(0.1);
  }

  //mario falling right
  if(keyWentUp(UP_ARROW) && marioDirection === "right"){
    mario.changeAnimation("walkRight",marioWalkRight);
  }

  //mario jumping left
  if(keyWentDown(UP_ARROW) && marioDirection === "left"){
    mario.changeAnimation("jumpLeft",marioJumpLeft);
    mario.velocityY = -10;
    jumpSound.play();
    jumpSound.setVolume(0.1);
  }

  //mario falling left
  if(keyWentUp(UP_ARROW) && marioDirection === "left"){
    mario.changeAnimation("walkLeft",marioWalkLeft);
  }

  
}

function spawnClouds() {

  //create cloud after every 60 frames
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1000,100,40,10);
    cloud.y = Math.round(random(80,175));

    //random images for clouds
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1 : cloud.addImage(cloud1img);
              break;
      case 2 : cloud.addImage(cloud2img);
              break;    
      default : break;    
    }
    cloud.scale = 1.3;
    cloud.velocityX = -3;
    cloud.lifetime = 400;
    mario.depth = cloud.depth;
    mario.depth++;
    cloudsGroup.add(cloud);
  }
}

function spawnMountains(){

  //create mountains after every 130 frames
  if (frameCount % 130 === 0) {
    mountain = createSprite(1000,395,40,10);
    var rand = Math.round(random(1,3));
    
    //random images for mountains
    switch(rand){
      case 1 : mountain.addImage(mountain1img);
              break;
      case 2 : mountain.addImage(mountain2img);
              break;    
      case 3 : mountain.addImage(mountain3img);
              break;          
      default : break;    
    }
    mountain.scale = 0.75;
    mountain.velocityX = -3;
    mountain.lifetime = 500;
    mountain.collide(ground);
    mountainGroup.add(mountain);
    mountain.depth = 15;
    mario.depth = mountain.depth;
    mario.depth++;
  }
}

function spawnBricks(){
  
  //create bricks after every 150 frames
  if (frameCount % 150 === 0) {
    var rand = Math.round(random(1,4));

    //random number of bricks and types
    switch(rand){
    case 1: bricks = createSprite(1000,200,10,10);
            bricks.y = Math.round(random(100,180));
            bricks.addImage(brickImg);
            bricks.scale =2
            bricks.velocityX = -4
            bricks.lifetime = 400;
            brickGroup.add(bricks);

            invbricks = createSprite(1000,205,40,10);
            invbricks.y = bricks.y+25;
            invbricks.velocityX = -4
            invbricks.lifetime = 400;
            invbricks.visible=false;
            //invbricks.debug=true;
            invBrickGroup.add(invbricks);
            break;

    case 2: for(var brs = 1000; brs<1100; brs=brs+50){
              bricks2 = createSprite(brs,150,10,10);
              bricks2.addImage(brickImg);
              bricks2.scale =2
              bricks2.velocityX = -4
              bricks2.lifetime = 400;
              brickGroup.add(bricks2);

              invbricks2 = createSprite(brs,150,40,10);
              invbricks2.y = bricks2.y+25;
              invbricks2.velocityX = -4
              invbricks2.lifetime = 400;
              invbricks2.visible=false;
              //invbricks2.debug=true;
              invBrickGroup.add(invbricks2);
            }
            break;

    case 3: coinbrick = createSprite(1000,160,50,10);
            coinbrick.addAnimation("coinbrick",coinbrickImg);
            coinbrick.velocityX = -4
            coinbrick.scale = 2.7;
            coinbrick.lifetime = 400;
            //coinbrick.debug=true;
            coinBrickGroup.add(coinbrick);

            invcoinbrick = createSprite(1000,160,40,10);
            invcoinbrick.y = coinbrick.y+25;
            invcoinbrick.velocityX = -4
            invcoinbrick.lifetime = 400;
            invcoinbrick.visible=false;
            //invcoinbrick.debug=true;
            invCoinBrickGroup.add(invcoinbrick);
            break;
    
    case 4: bricks3 = createSprite(1000,160,10,10);
            bricks3.addImage(brickImg);
            bricks3.scale =2;
            bricks3.velocityX = -4;
            bricks3.lifetime = 400;
            brickGroup.add(bricks3);

            invbricks3 = createSprite(1000,160,40,10);
            invbricks3.y = bricks3.y+25;
            invbricks3.velocityX = -4;
            invbricks3.lifetime = 400;
            invbricks3.visible=false;
            //invbricks3.debug=true;
            invBrickGroup.add(invbricks3);

            coinbrick2 = createSprite(1050,160,50,10);
            coinbrick2.addAnimation("coinbrick",coinbrickImg);
            coinbrick2.velocityX = -4
            coinbrick2.scale = 2.7;
            coinbrick2.lifetime = 400;
            //coinbrick2.debug=true;
            coinBrickGroup.add(coinbrick2);

            invcoinbrick2 = createSprite(1050,160,40,10);
            invcoinbrick2.y = coinbrick2.y+25;
            invcoinbrick2.velocityX = -4
            invcoinbrick2.lifetime = 400;
            invcoinbrick2.visible=false;
            //invcoinbrick2.debug=true;
            invCoinBrickGroup.add(invcoinbrick2);

            bricks3 = createSprite(1100,160,10,10);
            bricks3.addImage(brickImg);
            bricks3.scale =2
            bricks3.velocityX = -4
            bricks3.lifetime = 400;
            brickGroup.add(bricks3);

            invbricks3 = createSprite(1100,160,40,10);
            invbricks3.y = bricks3.y+25;
            invbricks3.velocityX = -4;
            invbricks3.lifetime = 400;
            invbricks3.visible=false;
            //invbricks3.debug=true;
            invBrickGroup.add(invbricks3);
            break;
   
    }
  }

  //creating brick for super Mario
  if(frameCount % 1100 === 0 && score >= 1100){
    mushroomBrick = createSprite(1000,150,10,10);
    mushroomBrick.addAnimation("mushroomBrick",mushroomBrickImg);
    mushroomBrick.scale=2.75;
    mushroomBrick.velocityX = -4;
    mushroomBrick.lifetime = 400;
    mushroomBrickGroup.add(mushroomBrick);
  
    invMushroomBrick = createSprite(1000,150,40,10);
    invMushroomBrick.y = mushroomBrick.y+25;
    invMushroomBrick.velocityX = -4;
    invMushroomBrick.lifetime = 400;
    invMushroomBrick.visible=false;
    //invMushroomBrick.debug=true;
    invMushroomBrickGroup.add(invMushroomBrick);
  } 
  
  //creating brick for firePower
  if(frameCount === 700){
    flowerBrick = createSprite(1000,150,10,10);
    flowerBrick.addAnimation("flowerbrick",mushroomBrickImg);
    flowerBrick.scale=2.75;
    flowerBrick.velocityX = -3;
    flowerBrick.lifetime = 500;
    flowerBrickGroup.add(flowerBrick);
  
    invFlowerBrick = createSprite(1000,150,40,10);
    invFlowerBrick.y = flowerBrick.y+25;
    invFlowerBrick.velocityX = -3;
    invFlowerBrick.lifetime = 500;
    invFlowerBrick.visible=false;
    //invFlowerBrick.debug=true;
    invFlowerBrickGroup.add(invFlowerBrick);
  }
}

function hittingBricks(){

  //hitting brick
  for(var br = 0; br<invBrickGroup.length; br++){
    for(var br1 = 0; br1<brickGroup.length; br1++){
      if(invBrickGroup.isTouching(mario)){
        invBrickGroup.get(br).remove();
        brickGroup.get(br1).remove();
        brick2 = createSprite(1000,200,30,30);
        brick2.addImage(brick2Img);
        brick2.x = mario.x;
        brick2.y = mario.y - 20;
        brick2.velocityY +=5;
        brick2.scale = 2;
        brick2.lifetime = 100;
        ground.depth = brick2.depth;
        ground.depth++;
        hitBrickSound.play();
        hitBrickSound.setVolume(0.1);
      }
    }
    
  }
    
  //hitting coin brick
  for(var icb = 0; icb <invCoinBrickGroup.length; icb++){
    for(var cb = 0; cb<coinBrickGroup.length; cb++){
      if(invCoinBrickGroup.isTouching(mario)){
        invCoinBrickGroup.get(icb).remove();
        coinBrickGroup.get(cb).remove();
        emptybrick = createSprite(1000,160,30,30);
        emptybrick.addAnimation("empty",coinbrick2Img);
        emptybrick.x = mario.x+10;
        emptybrick.velocityX = -4;
        emptybrick.scale = 2.75;
        emptybrick.lifetime = 200;
        brickGroup.add(emptybrick);

        coin2 = createSprite(1000,140,30,30);
        coin2.addImage(coinImg);
        coin2.x = emptybrick.x;
        coin2.velocityY = -4;
        coin2.scale = 1.75;
        coin2.lifetime = 25;
        score = score + 50;
        coinSound.play();
        coinSound.setVolume(0.1);
      }
    }
  }

  //hitting mushroom brick
  if(invMushroomBrickGroup.isTouching(mario)){
    invMushroomBrickGroup.destroyEach();
    mushroomBrickGroup.destroyEach();
    mushroombrick2 = createSprite(1000,140,30,30);
    mushroombrick2.addAnimation("empty",coinbrick2Img);
    mushroombrick2.x = mario.x;
    mushroombrick2.velocityX = -4;
    mushroombrick2.scale = 2.75;
    mushroombrick2.lifetime = 200;
    brickGroup.add(mushroombrick2);

    bigMushroom = createSprite(1000,140,30,30);
    bigMushroom.addImage(bigMushroomImg);
    bigMushroom.x = mushroombrick2.x+50;
    bigMushroom.velocityX = -4;
    bigMushroom.setVelocity(0,2);
    bigMushroom.scale = 0.65;
    bigMushroom.setCollider("rectangle",0,0,70,70);
    //bigMushroom.debug = true;
    bigMushroom.lifetime = 300;
    bigMushroomGroup.add(bigMushroom);
    hitBrickSound.play();
    hitBrickSound.setVolume(0.1);
  }

  //if mario touches bigMushroom then turn into Super Mario
  if(bigMushroomGroup.isTouching(mario)){
    bigMushroomGroup.destroyEach();
    marioSize = "big";
    powerUpSound.play();
    powerUpSound.setVolume(0.1);
  }

  //hitting flower brick
  if(invFlowerBrickGroup.isTouching(mario)){
    invFlowerBrickGroup.destroyEach();
    flowerBrickGroup.destroyEach();
    flowerbrick2 = createSprite(1000,140,30,30);
    flowerbrick2.addAnimation("empty",coinbrick2Img);
    flowerbrick2.x = mario.x+20;
    flowerbrick2.velocityX = -2;
    flowerbrick2.scale = 2.75;
    flowerbrick2.lifetime = 300;
    flowerBrickGroup.add(flowerbrick2);

    flower = createSprite(1000,140,30,30);
    flower.addAnimation("flower",flowerImg);
    flower.x = flowerbrick2.x;
    flower.y = flowerbrick2.y - 40;
    flower.velocityX = -2;
    flower.scale = 1.25;
    //flower.debug = true;
    flower.lifetime = 300;
    flowerGroup.add(flower);   
    hitBrickSound.play();
    hitBrickSound.setVolume(0.1);
  }

  //if mario touches flower then he can start shooting fireballs
  if(flowerGroup.isTouching(mario)){
      flowerGroup.destroyEach();
      firePower = true;
      powerUpSound.play();
      powerUpSound.setVolume(0.1);
  }
   

}

function spawnCoins() {
  //create coin after every 125 frames
  if (frameCount % 125 === 0) {

    var r = Math.round(random(1,2));
    switch(r){
      case 1: var coin = createSprite(1000,100,40,10);
              coin.y = Math.round(random(90,180));
              coin.addImage(coinImg);
              coin.scale = 1.75;
              coin.velocityX = -3;
              coin.lifetime = 400;
              coin.depth++;
              coinGroup.add(coin);
              break;

      case 2: var coin2 = createSprite(1000,150,40,10);
              coin2.addImage(coinImg);
              coin2.scale = 1.75;
              coin2.velocityX = -3;
              coin2.lifetime = 400;
              coin2.depth++;
              coinGroup.add(coin2);

              var coin3 = createSprite(1040,150,40,10);
              coin3.addImage(coinImg);
              coin3.scale = 1.75;
              coin3.velocityX = -3;
              coin3.lifetime = 400;
              coin3.depth++;
              coinGroup.add(coin3);
              break;
    }
    
  }

  //if coin is touched then score increases
  for(var c1 = 0; c1<coinGroup.length; c1++){
    if(coinGroup.get(c1).isTouching(mario)){
      coinGroup.get(c1).remove();
      score = score + 50;
      coinSound.play();
      coinSound.setVolume(0.1);
    }
  }
}

function spawnTubes(){
  //create tubes after every 250 frames
  if (frameCount % 250 ===0){
    tube = createSprite(1000,370,10,10);
    tube.velocityX = -2;

    //random images for tubes
    var rand = Math.round(random(1,3));
    switch(rand) {
     
      case 1: tube.addImage(tube1img);
              tube.setCollider("rectangle",15,0,30,65);
              tube.y = 350;
              tube.scale = 0.75;
              //tube.debug=true;
              var tube2 = createSprite(975,370,50,40);
              //tube2.debug=true;
              tube2.velocityX = -2;
              tube2.visible = false;
              var tube3 = createSprite(975,340,50,40);
              tube3.debug=true;
              tube3.velocityX = -2;
              tube3.visible = false;
              turtleGroup.bounceOff(tube3);
              invTurtleGroup.bounceOff(tube3);
              tubeGroup.add(tube2);
              break;
      case 2: tube.addImage(tube2img);
              tube.y = 400;
              break;
      case 3: cactus= createSprite(1000,322,10,10);
              cactus.addAnimation("cactus",cactusimg);
              cactus.velocityX = -2;
              //cactus.debug=true;
              cactus.setCollider("rectangle",0,0,30,50);
              cactusGroup.add(cactus); 
              tube.addImage(tube3img);
              break;
      default: break;
   
    }
    tube.scale =1.5;
    ground.depth = tube.depth;
    ground.depth++;
    tube.lifetime = 600;
    tubeGroup.add(tube);     
  }
}

function spawnMushrooms(){
  //create mushrooms every 350 frames and when score is less than 1000
  if(frameCount% 350===0 && score < 1000){
    mushroom = createSprite(1000,375,10,10);
    mushroom.velocityX = -3;
    mushroom.addAnimation("mushroom",mushroomsimg);
    mushroom.setCollider("rectangle",0,0,15,15);
    mushroom.scale = 2.3;
    mushroom.lifetime = 1000;
    //mushroom.debug=true;
    mushroom.collide(ground);
    mushroomGroup.add(mushroom);

    invMushroom = createSprite(990,365,45,10);
    invMushroom.setCollider("rectangle",0,0,40,10);
    //invMushroom.debug=true;
    invMushroom.velocityX = mushroom.velocityX;
    invMushroom.lifetime = 1000;
    invMushroom.collide(mushroom);
    invMushroom.visible=false;
    invMushroomGroup.add(invMushroom);

  }
}

function spawnTurtles(){
  //create turtles after every 350 frames and when score >= 1000
  if (frameCount%350===0 && score >= 1000){
    turtle = createSprite(1000,365,10,10);
    turtleimg.frameDelay = 50;
    turtle.addAnimation("turtle",turtleimg);
    turtle.velocityX = -3;
    turtle.scale = 2.5;
    turtle.lifetime = 1000;
    //turtle.debug=true;
    turtleGroup.add(turtle);

    invTurtle = createSprite(980,335,45,10);
    invTurtle.debug=true;
    invTurtle.velocityX = turtle.velocityX;
    invTurtle.lifetime = 1000;
    invTurtle.visible=false;
    invTurtleGroup.add(invTurtle);
  }
}

function killEnemies(){

  //kill mushroom
  for(var mr = 0; mr<invMushroomGroup.length; mr++){
      for(var m1 = 0; m1<mushroomGroup.length; m1++){
        if(invMushroomGroup.isTouching(mario)){
          mushroom2 = createSprite(1000,380,10,10);
          mushroom2.x = mario.x;
          mushroom2.velocityX = -3;
          mushroom2.addAnimation("deadMushroom",deadMushroomImg);
          mushroom2.scale = 2.3;
          mushroom2.lifetime = 10;
          fill("white");
          textSize(20);
          text(100,mushroom2.x+50,mushroom2.y-50);
          score = score + 100;
          invMushroomGroup.get(mr).remove();
          mushroomGroup.get(m1).remove();
          stompSound.play();
          stompSound.setVolume(0.1);
        }
      }  
  } 

  //kill turtle
  for(var tr = 0; tr<invTurtleGroup.length; tr++){
    for(var t1 = 0; t1<turtleGroup.length; t1++){
      if(invTurtleGroup.isTouching(mario)){
        turtle2 = createSprite(1000,380,10,10);
        turtle2.x = mario.x+50;
        turtle2.addAnimation("deadTurtle",deadTurtleImg);
        turtle2.scale = 2.3;
        turtle2.bounceOff(tubeGroup);
        turtle2.lifetime = 30;
        fill("white");
        textSize(20);
        text(150,turtle2.x+50,turtle2.y-50);
        score = score + 150;
        invTurtleGroup.get(tr).remove();
        turtleGroup.get(t1).remove();
        stompSound.play();
        stompSound.setVolume(0.1);
      }
    }  
  } 
}

function shootfireball(){

  if(firePower === true){
    //fire mario animation
    fMarioMovement();

    //text appears for player to know which key used for firing
    text("SPC = FIRE",635,30);

    //shooting fireball towards right
    if(keyWentDown("space") && marioDirection === "right"){
      fireball = createSprite(520,370,20,20);
      fireball.addAnimation("fireball",fireballimg);
      fireball.x= mario.x+20;
      fireball.y= mario.y;
      fireball.velocityX = 6;
      fireballGroup.add(fireball);
      fireball.lifetime = 600;
      fireballSound.play();
      fireballSound.setVolume(0.1);
    }

    //shooting fireball towards left
    if(keyWentDown("space") && marioDirection === "left"){
      fireball2 = createSprite(520,370,20,20);
      fireball2.addAnimation("fireball",fireballimg);
      fireball2.x= mario.x-50;
      fireball2.y= mario.y;
      fireball2.velocityX = -6;
      fireballGroup.add(fireball2);
      fireball2.lifetime = 600;
      fireballSound.play();
      fireballSound.setVolume(0.1);
    }

    //fireball will destroy if they touch tubes / bricks
    for(var f = 0; f<fireballGroup.length; f++){
      if(fireballGroup.isTouching(tubeGroup) || fireballGroup.isTouching(brickGroup) || fireballGroup.isTouching(invBrickGroup) || 
      fireballGroup.isTouching(coinBrickGroup) ){
        fireballGroup.get(f).remove();
      }
    } 

    //destroying cactus via fireball
    for(var i =0; i<fireballGroup.length; i++){
      for(var c = 0; c<cactusGroup.length; c++){
        if(fireballGroup.isTouching(cactusGroup)){
          fireballGroup.get(i).remove();
          cactusGroup.get(c).remove();
        }
      } 
    }

  
    //destroying mushroom via fireball
    for(var a =0; a<fireballGroup.length; a++){
      for(var m= 0; m<mushroomGroup.length; m++){
        for(var mr2 = 0; mr2<invMushroomGroup.length; mr2++){
            if(fireballGroup.isTouching(mushroomGroup) || fireballGroup.isTouching(invMushroomGroup)){
              fireballGroup.get(a).remove();
              mushroomGroup.get(m).remove();
              invMushroomGroup.get(mr2).remove();
              score = score + 100;
            }
        }
      }
    }

    //destroying turtle via fireball
    for(var b =0; b<fireballGroup.length; b++){
      for(var t= 0; t<turtleGroup.length; t++){
        for(var t2 = 0; t2<invTurtleGroup.length; t2++){
          if(fireballGroup.isTouching(turtleGroup) || fireballGroup.isTouching(invTurtleGroup)){
            fireballGroup.get(b).remove();
            turtleGroup.get(t).remove();
            invTurtleGroup.get(t2).remove();
            score = score + 150;
          }
        }
        
      }
    }
  }
}

function fMarioMovement(){

  mario.changeAnimation("fwalkRight",fMarioWalkRight);

  //fire mario walking towards right
  if(keyDown(RIGHT_ARROW)){
    mario.changeAnimation("fwalkRight",fMarioWalkRight);
    mario.x = mario.x + 5;
    marioDirection = "right";

  }

  //fire mario walking towards left
  if(keyDown(LEFT_ARROW)){
    mario.changeAnimation("fwalkLeft",fMarioWalkLeft);
    mario.x = mario.x - 5;
    marioDirection = "left";
  }

  //fire mario jumping right
  if(keyWentDown(UP_ARROW) && marioDirection === "right"){
    mario.changeAnimation("fjumpRight",fMarioJumpRight);
    mario.velocityY = -8;
    jumpSound.play();
    jumpSound.setVolume(0.1);
  }

  //fire mario falling right
  if(keyWentUp(UP_ARROW) && marioDirection === "right"){
    mario.changeAnimation("fwalkRight",fMarioWalkRight);
  }

  //fire mario jumping left
  if(keyWentDown(UP_ARROW) && marioDirection === "left"){
    mario.addAnimation("fjumpLeft",fMarioJumpLeft);
    mario.velocityY = -10;
    jumpSound.play();
    jumpSound.setVolume(0.1);
  }

  //fire mario falling left
  if(keyWentUp(UP_ARROW) && marioDirection === "left"){
    mario.changeAnimation("fwalkLeft",fMarioWalkLeft);
  }

  
}

function marioDying(){
  //if mario touches cactus
  if(cactusGroup.isTouching(mario) || mushroomGroup.isTouching(mario) || turtleGroup.isTouching(mario)){

    if(firePower === true){
      mario.addAnimation("fdeadMario",deadfMarioImg);
    }
    else{
      mario.changeAnimation("deadMario",deadMarioImg);
    }
    
    themeSound.pause();
    lives = lives - 1;
    dieSound.play();
    dieSound.setVolume(0.1);
    pauseGame();
    gameState = "reset";
    
  }
  
}

function pauseGame(){
  mario.setVelocity(0,0);
  ground.velocityX=0;
  brickGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  mountainGroup.setVelocityXEach(0);
  invBrickGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);
  coinBrickGroup.setVelocityXEach(0);
  invCoinBrickGroup.setVelocityXEach(0);
  mushroomBrickGroup.setVelocityXEach(0);
  invMushroomBrickGroup.setVelocityXEach(0);
  bigMushroomGroup.setVelocityXEach(0);
  tubeGroup.setVelocityXEach(0);
  cactusGroup.setVelocityXEach(0);
  turtleGroup.setVelocityXEach(0);
  invTurtleGroup.setVelocityXEach(0);
  mushroomGroup.setVelocityXEach(0);
  invMushroomGroup.setVelocityXEach(0);
  fireballGroup.setVelocityXEach(0);
  flowerBrickGroup.setVelocityXEach(0);
  invFlowerBrickGroup.setVelocityXEach(0);
  flowerGroup.setVelocityXEach(0);

  brickGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  mountainGroup.setLifetimeEach(-1);
  invBrickGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
  coinBrickGroup.setLifetimeEach(-1);
  invCoinBrickGroup.setLifetimeEach(-1);
  mushroomBrickGroup.setLifetimeEach(-1);
  invMushroomBrickGroup.setLifetimeEach(-1);
  bigMushroomGroup.setLifetimeEach(-1);
  tubeGroup.setLifetimeEach(-1);
  cactusGroup.setLifetimeEach(-1);
  turtleGroup.setLifetimeEach(-1);
  invTurtleGroup.setLifetimeEach(-1);
  mushroomGroup.setLifetimeEach(-1);
  invMushroomGroup.setLifetimeEach(-1);
  fireballGroup.setLifetimeEach(-1);
  flowerBrickGroup.setLifetimeEach(-1);
  invFlowerBrickGroup.setLifetimeEach(-1);
  flowerGroup.setLifetimeEach(-1);
}

function reset(){
  themeSound.play();
  gameState = "play";
  firePower = false;
  marioSize = "small";
  mario.x = 300;
  mario.changeAnimation("walkRight",marioWalkRight);
  ground.velocityX = -1;
  cloudsGroup.destroyEach();
  mountainGroup.destroyEach();
  brickGroup.destroyEach();
  invBrickGroup.destroyEach();
  coinGroup.destroyEach();
  coinBrickGroup.destroyEach();
  invCoinBrickGroup.destroyEach();
  tubeGroup.destroyEach();
  cactusGroup.destroyEach();
  mushroomGroup.destroyEach();
  invMushroomGroup.destroyEach();  
  mushroomBrickGroup.destroyEach();
  invMushroomBrickGroup.destroyEach();
  bigMushroomGroup.destroyEach();
  turtleGroup.destroyEach();
  invTurtleGroup.destroyEach();
  fireballGroup.destroyEach();
  flowerBrickGroup.destroyEach();
  invFlowerBrickGroup.destroyEach();
  flowerGroup.destroyEach();

}

function endGame(){

  themeSound.stop();
  mario.lifetime = 0;
  ground.lifetime = 0;
  brickGroup.destroyEach();
  cloudsGroup.destroyEach();
  mountainGroup.destroyEach();
  invBrickGroup.destroyEach();
  coinGroup.destroyEach();
  coinBrickGroup.destroyEach();
  invCoinBrickGroup.destroyEach();
  mushroomBrickGroup.destroyEach();
  invMushroomBrickGroup.destroyEach();
  bigMushroomGroup.destroyEach();
  tubeGroup.destroyEach();
  cactusGroup.destroyEach();
  turtleGroup.destroyEach();
  invTurtleGroup.destroyEach();
  mushroomGroup.destroyEach();
  invMushroomGroup.destroyEach();
  fireballGroup.destroyEach();
  flowerBrickGroup.destroyEach();
  invFlowerBrickGroup.destroyEach();
  flowerGroup.destroyEach();

  gameover.visible = true;
  restart.visible = true;

  if(mousePressedOver(restart)){
    location.reload();
  }
}

function winGame(){
  themeSound.stop();
  mario.x = 475;
  mario.y = 377;
  mario.scale = 0.45;
  mario.changeAnimation("standRight",marioStandRight);
  mario.velocityY = mario.velocityY + 0.8;
  mario.collide(ground);
  ground.velocityX = 0;
  cloudsGroup.setLifetimeEach(-1);
  mountainGroup.setLifetimeEach(-1);
  cloudsGroup.setVelocityXEach(0);
  mountainGroup.setVelocityXEach(0);
  brickGroup.destroyEach();
  invBrickGroup.destroyEach();
  coinGroup.destroyEach();
  coinBrickGroup.destroyEach();
  invCoinBrickGroup.destroyEach();
  tubeGroup.destroyEach();
  cactusGroup.destroyEach();
  mushroomGroup.destroyEach();
  invMushroomGroup.destroyEach();  
  mushroomBrickGroup.destroyEach();
  invMushroomBrickGroup.destroyEach();
  bigMushroomGroup.destroyEach();
  turtleGroup.destroyEach();
  invTurtleGroup.destroyEach();
  fireballGroup.destroyEach();
  flowerBrickGroup.destroyEach();
  invFlowerBrickGroup.destroyEach();
  flowerGroup.destroyEach();

  princess.visible = true;
  princess.x = 515;
  princess.depth = mario.depth;
  princess.collide(ground);
  
  congrats = createSprite(500,220,100,100);
  congrats.addAnimation("congrats",congratsImg);
  congrats.scale = 0.5;
}