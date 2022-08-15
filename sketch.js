var enemies
var bg , bgImg ;
var ninja , ninjaImg ;
var ninjaFire , ninjaFireImg ;
var bird , birdImg ;
var enemy1 , enemy1Img  , enemy2 , enemy2Img , enemy3 , enemy3Img ;
var weapon , weaponImg ;
var enemyGroup , weaponGroup ;
var gameOver , gameOverImg ;
var PLAY=1;
var END=0;
var gameState = PLAY;
var score = 0;


function preload()
{
	bgImg = loadImage("bg.jpg");
	ninjaImg = loadAnimation("ninja1.png","ninja2.png","ninja3.png","ninja4.png","ninja5.png","ninja6.png");
	ninjaFireImg = loadAnimation("ninjafire1.png" , "ninjafire2.png" , "ninjafire3.png" , "ninjafire4.png" , "ninjafire5.png" , "ninjaFire6.png");
	birdImg = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png");
	enemy1Img = loadImage("enemy1.png");
	enemy2Img = loadImage("enemy2.png");
	enemy3Img = loadImage("enemy3.png");
	weaponImg = loadImage("weapon.png");
	gameOverImg = loadImage("gameOver.png");
	
}

function setup() {

	createCanvas(700, 360);

	
	// moving background 
	bg = createSprite(500,180);
	bg.addImage(bgImg);
	bg.velocityX = -5;


	// creating ninja
	ninja = createSprite(80 , 240 , 50 ,50);
	ninja.scale = 0.8
	ninja.addAnimation("ninja",ninjaImg);
	

	// creating bird
	bird = createSprite(150 , 130 , 20 , 20);
	bird.addAnimation("bird",birdImg);
	bird.scale = 0.5
	bird.x = ninja.x ;

	//game over
	gameOverSprite=createSprite(350,180,10,10);
	gameOverSprite.addImage("gameover",gameOverImg);
	gameOverSprite.visible=false;
	
	
	
	// making groups
	enemyGroup = new Group();
	weaponGroup = new Group();
	
}


function draw() {
background(0);

if(gameState===PLAY){
// calling functions
spawnEnemies();

//code to reset the background

if(bg.x < 290 )
{
   	   bg.x = width/2;
}
	
// creating weapon
if(keyDown("space")){
	spawnWeapon();
}


if(ninja.isTouching(enemyGroup)){
	gameState=END ;
} 

}


else if(gameState === END){
bg.velocityX = 0;
ninja.visible=false;
bird.visible=false;
enemyGroup.setVelocityXEach(0);
enemyGroup.destroyEach();
weaponGroup.destroyEach();
enemyGroup.setLifetimeEach(-1);
gameOverSprite.visible=true;


}

drawSprites();
// text
textSize(17)
fill("black");
text("SCORE : "+score,600,20);
fill("red");
text("ZOOM '175' FOR THE BEST EXPERIANCE", 30 , 20);

 
}

function spawnEnemies(){

	if(frameCount % 50 === 0 ){
		
		enemies = createSprite(random(600,750),random(255,256)) ;
		enemies.velocityX = -2
		
		
		var rand = Math.round(random(1,2));
		switch(rand) {

			case 1:enemies.addImage(enemy1Img);
				   enemies.scale = 0.5
				   break;
			case 2:enemies.addImage(enemy2Img);
				   enemies.scale = 0.4
				   break;
			default: break;
		
		}
		enemyGroup.add(enemies);
	
	}


	for(i=0;i<enemyGroup.length;i=i+1){
      
		if(weaponGroup.isTouching(enemyGroup.get(i))){
		  score=score+1;
		  enemyGroup.get(i).destroy();
		  weaponGroup.setLifetimeEach(-1);
		  weaponGroup.destroyEach();
		  //weapon.velocityX=0
	  
		}
 
     }
	}


function spawnWeapon(){

	weapon = createSprite(150 , 240 , 20 , 20);
	weapon.addImage(weaponImg);
	weapon.velocityX=4;
	weapon.scale = 0.2 ;
	weapon.x = ninja.x ;
	weapon.y = ninja.y ;
	weaponGroup.add(weapon);
}

			