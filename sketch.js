
var platformGroup,platformImage, diamondsGroup,  coinScore=0, coinsGroup, stoneGroup, bg, backgroundImg , ironImg , iron , ground ,stoneImg,diaImg;
var gameState ="PLAY";
//In This Function We load basic things i.e. images,sound.
function preload() {
  backgroundImg = loadImage("images/nig.gif");
  ironmanImg = loadImage("images/images.png");
  
  diaImg=loadImage("images/d.png");
  coinSound = loadSound("sounds/coinSound.mp3");
  obsImg=loadImage("images/spikes.png");
  dieSound=loadSound("sounds/dieSound.mp3");
  jumpSound=loadSound("sounds/jump.mp3");
  platformImage=loadImage("images/st.png")
  restartImg=loadImage("images/restart.png")
  startImg=loadImage("images/star.png")
}

// In This Function We can Draw Sprite Means a Place Where We Have To put The Things.
function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale =3;

  iron = createSprite(200,505,20,50);
  iron.scale=0.7;
  iron.addImage("running",ironmanImg);
  iron.setCollider("rectangle",100,0,200,400);
  platformGroup= new Group();
  diamondsGroup= new Group();
 
  

  stoneGroup= new Group ();
  coinsGroup= new Group();
  obsGroup= new Group();

  ground = createSprite(500,585,1000,10 );
  ground.visible = false;

  start=createSprite(500,300);
  start.addImage(startImg);
  start.visible=false;

  restart = createSprite(500,300);
  restart.addImage(restartImg);
  restart.visible= false;
 
}
// In This Function We Specify the work of buttons. 

function draw() {


  start.visible=true;
  if(mousePressedOver(start)){
    startGame();
  }
if(gameState==="PLAY"){
 
  bg.velocityY = 4;
  if(bg.y > 600){
    bg.y = 300;
  } 

  if (bg.y > 600){
    bg.y=bg.width/4;
  }
  if(iron.y<200){
    iron.y=200;
  }

  // if(iron.x<500){
    // iron.x=500;
  // }


if(keyDown("up")){
  iron.y=iron.y-20;
  
}

if(keyDown("down")){
  iron.y=iron.y+3;
}

if(keyDown("left")){
  iron.x=iron.x-3;
}

if(keyDown("right")){
  iron.x=iron.x+3;
}



generatePlatforms();
for (var i = 0; i < platformGroup.length; i++) {
  var temp = platformGroup.get(i);

  if (temp.isTouching(iron)) {
    iron.collide(temp);
  }
}

generateObs();
for(var i = 0 ; i< (obsGroup).length ;i++){
  var temp = (obsGroup).get(i) ;
  
  if (temp.isTouching(iron)) {
    dieSound.play();
    coinScore=coinScore-5;
    temp.destroy();
    temp=null;
  
   
    }
      
  }

         
generateCoins();
    for(var i = 0 ; i< (coinsGroup).length ;i++){
      var temp = (coinsGroup).get(i) ;
      
      if (temp.isTouching(iron)) {
        coinSound.play();
        coinScore++;
        temp.destroy();
        temp=null;
        }
          
      }
      if(coinScore<=-10 || iron.y>610){
        gameState ="END";
       }
 }
      else if (gameState === "END") { 
        bg.velocityY = 0;
        iron.velocityY = 0;  
         
        obsGroup.setVelocityYEach(0);
        coinsGroup.setVelocityYEach(0);
        stoneGroup.setVelocityYEach(0);
        obsGroup.setLifetimeEach(-1);
        coinsGroup.setLifetimeEach(-1);
        stoneGroup.setLifetimeEach(-1);
       restart.visible=true;
       if(mousePressedOver(restart)){
         restartGame();
       }
       
      }
iron.collide(ground);
iron.velocityY=iron.velocityY+0.5;
    
    drawSprites();
    textSize(50);
    fill("red");
    text("Diamonds :   "  +coinScore, 750,50 )  ;
   
}

function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    brick.scale=0.3;
    platformGroup.add(brick);
    
  }
}
// In This Function We Generate Stones On Which iron man can stand.


//In This Function We Generate coin If iron man collect it then score is increase by 1 .
function generateCoins() {
  if (frameCount % 70 === 0) {
    var coin = createSprite(random(100, 800), 10, 40, 10);
    coin.addImage(diaImg);
    coin.x = random(100,800);
    coin.scale = 0.5;
    coin.velocityY = 3;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}

//In This Function We Generate obstacles If Iron Man Touch It The Score Is Reduced By -5.
function generateObs(){
  if(frameCount%100===0){
    var obstacle= createSprite(random(100,800),10,40,10);
    obstacle.addImage(obsImg);
    obstacle.x = random(200,700);
    obstacle.scale=0.5;
    obstacle.velocityY=3;
    obstacle.lifetime=1200;
    obsGroup.add(obstacle);
  }
}

function restartGame(){
  gameState = "PLAY";
  platformGroup.destroyEach();
  diamondsGroup.destroyEach();
  obsGroup.destroyEach();
  coinScore=0;
  iron.y=50;
  restart.visible=false;
}

function startGame(){
 
 gameState = "PLAY";
 platformGroup.destroyEach();
 diamondsGroup.destroyEach();
 obsGroup.destroyEach();
 coinScore=0;
 iron.y=50;
 start.visible=false; 
}