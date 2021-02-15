var luke;
var ground;
var enemy;
var platform;
var coin;
var platform;
var score = 0;
var hp = 1500;
var block;
var wpn;

function preload(){

}

function setup() {

  createCanvas(800,600);

  luke = createSprite(50, 560, 20, 40);

  ground = createSprite(400, 590, 800, 20);
  ground.velocityX = -5;

  CoinGroup = new Group();
  PlatGroup = new Group();
  BlockGroup = new Group();
  EnemyGroup = new Group();
  WpnGroup = new Group();

}

function draw() {

  background(255,255,255);

  spawnPlatform();

  spawnenemy();

  if(ground.x < 400){
  ground.x = ground.width/2;
  }

  if(keyDown("UP_ARROW")){
    luke.velocityY = -10;
  }
  
  luke.velocityY = luke.velocityY + 0.8;

  if(keyDown("RIGHT_ARROW")){
    luke.x = luke.x + 5;
  }
  
  if(keyDown("LEFT_ARROW")){
    luke.x = luke.x - 5;
  }

  if(luke.isTouching(CoinGroup)){
    score += 5;
    CoinGroup.destroyEach();
  }

  if(luke.isTouching(BlockGroup)){
    luke.velocityX = 0;
  }

  if(luke.isTouching(EnemyGroup)){
    hp = hp - 5; 
  }

  if(hp === 0){
    console.log("Game Over!");
  }

  if(keyWentDown("SPACE")){
    wpn = createSprite(luke.x, luke.y, 10, 10);
    wpn.velocityX = 15;
    wpn.lifetime = (800-wpn.x)/15;
    WpnGroup.add(wpn);
  }

  if(WpnGroup.isTouching(EnemyGroup)){
    EnemyGroup.destroyEach();
  }

  luke.collide(ground);
  luke.collide(PlatGroup);

  drawSprites();

  textSize(30);
  stroke("gold");
  text("Score : " + score, 10, 20);
  text("Hitpoints : " + hp, 10, 50);

}

function spawnPlatform(){

  if(frameCount % 60 === 0){
    platform = createSprite(790, random(0, 540), random(40, 60), 15);
    block = createSprite(platform.x - 30, platform.y, 10,platform.height);
    block.visibile = false;
    coin = createSprite(platform.x, platform.y - 35, 10, 10);

    platform.velocityX = -5;
    coin.velocityX = platform.velocityX;
    block.velocityX = platform.velocityX;

    platform.lifetime = 160;
    coin.lifetime = 160;
    PlatGroup.add(platform);
    CoinGroup.add(coin);
    BlockGroup.add(block);

  }

}

function spawnenemy(){

  if(frameCount%57 === 0){
    enemy = createSprite(790, random(0, 560), 15, 30);
    enemy.velocityX = -5;
    enemy.velocityY = random(5, -5);
    enemy.lifetime = 160;
    enemy.collide(ground);
    EnemyGroup.add(enemy);
  }

}