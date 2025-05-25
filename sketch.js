const WORLDTIME = 1;

//images
let charaterImg, tileImg,collectableSheet;
//sprites
let Mario, groundSensor, counter, enemy, checkpoint, titleImg, endImg;
//stats/values
let JumpY, jumpCount,tileSize, bounces, cloudy,
	coinScore,orbScore,slowScale,orbs,lives, titleScreen, endScreen;
//powers
let timeAmount, timeSlowable, maxTime, accellerate, recharge;

var collection = [];

function preload() {
	tileImg = loadImage("photos/tileSheet.png");
	collectableImg = loadImage("photos/collectableSheet.png");
}
function tiles(){
	//floor group for all floor tiles
	floor = new Group();
	floor.w = 20;
	floor.h=20;
	floor.layer=0;
	floor.collider = ('static');
	//rocks wihtout grass
	rock = new floor.Group();
	rock.spriteSheet = tileImg;
	rock.addAni({ w:20, h:20, row:6, col:2 });
	rock.tile = 'r';
	//rocks with grass on top as the floor
	grassRock = new floor.Group();
	grassRock.spriteSheet = tileImg;
	grassRock.addAni({ w:20, h:20, row:6 });
	grassRock.tile = 'g';
	//floating rocks
	floatRocks = new floor.Group();
	floatRocks.spriteSheet = tileImg;
	floatRocks.addAni({ w:20, h:20, row:6, col:1 });
	floatRocks.tile = 'f';
	//side grass left
	leftGrass = new floor.Group();
	leftGrass.spriteSheet = tileImg;
	leftGrass.addAni({ w:20, h:20, row:8 });
	leftGrass.tile = 'l';
	//side grass right
	rightGrass = new floor.Group();
	rightGrass.spriteSheet = tileImg;
	rightGrass.addAni({ w:20, h:20, row:7 });
	rightGrass.tile = 'R';
	

	//clouds
	clouds = new Group();
	clouds.layer = 1;
	clouds.collider = 'static';
	//bouncy Clouds
	bouncyClouds = new clouds.Group();
	//base clouds
	cloud = new bouncyClouds.Group();
	cloud.tile = '1';
	cloud.spriteSheet = tileImg;
	cloud.addAni({ w:20, h:20, row:0, col:7 });
	//left cloud
	leftCloud = new bouncyClouds.Group();
	leftCloud.tile = '2';
	leftCloud.spriteSheet = tileImg;
	leftCloud.addAni({ w:20, h:20, row:2, col:6 });
	//right cloud
	rightCloud = new bouncyClouds.Group();
	rightCloud.tile = '3';
	rightCloud.spriteSheet = tileImg;
	rightCloud.addAni({ w:20, h:20, row:1, col:6 });
	//time clouds
	timeClouds = new clouds.Group();
	timeClouds.overlapping(Mario);
	timeClouds.opacity = 0.8;
	//base time cloud
	pilCloud = new timeClouds.Group();
	pilCloud.collider = 'static';
	pilCloud.spriteSheet = tileImg;
	pilCloud.addAni({ w:20, h:20, row:0, frames:3 });
	pilCloud.tile = '4';
	pilCloud.ani.frameDelay = 20;
	//left time cloud
	leftPilCloud = new timeClouds.Group();
	leftPilCloud.collider = "static";
	leftPilCloud.spriteSheet = tileImg;
	leftPilCloud.addAni({ w:20, h:20, row:2, frames:3 });
	leftPilCloud.tile = '5';
	leftPilCloud.ani.frameDelay = 20;
	//right time cloud
	rightPilCloud = new timeClouds.Group();
	rightPilCloud.collider = 'static';
	rightPilCloud.spriteSheet = tileImg;
	rightPilCloud.addAni({ w:20, h:20, row:1, frames:3 });
	rightPilCloud.tile = '6';
	rightPilCloud.ani.frameDelay = 20;
	
	
	//background / decoration
	//pillars
	pillars = new Group();
	pillars.w = 20;
	pillars.h = 20;
	pillars.layer = 0;
	pillars.collider = ('static');
	pillars.overlapping(Mario);
	pillars.opacity = 0.7;
	//bottom
	botPil = new pillars.Group();
	botPil.tile = '_';
	botPil.spriteSheet = tileImg;
	botPil.addAni({ w:20, h:20, row:5 });
	//complete top
	topPil = new pillars.Group();
	topPil.tile = '+';
	topPil.spriteSheet = tileImg;
	topPil.addAni({ w:20, h:20, row:3 });
	//middle pillar
	middlePil = new pillars.Group();
	middlePil.tile = '=';
	middlePil.spriteSheet = tileImg;
	middlePil.addAni({ w:20, h:20, row:4 });
	//broken top
	brokenPil = new pillars.Group();
	brokenPil.tile = '-';
	brokenPil.spriteSheet = tileImg;
	brokenPil.addAni({ w:20, h:20, row:3, col:1 });
	//decoration
	decoration = new Group();
	decoration.w = 20;
	decoration.h = 20;
	decoration.layer = 0;
	decoration.collider = ('static');
	decoration.overlapping(Mario);
	decoration.opacity = 0.75;
	//bush
	bush = new decoration.Group();
	bush.tile = 'b';
	bush.spriteSheet = tileImg;
	bush.addAni({ w:20, h:20, row:4, col:11 });
	//decorative rock
	dRock = new decoration.Group();
	dRock.tile = 'd';
	dRock.spriteSheet = tileImg;
	dRock.addAni({ w:20, h:20, row:5, col:10 });
	
	
	//Collectables
	collectable = new Group();
	collectable.collider = ('static');
	collectable.w=16;
	collectable.h=16;
	collectable.layer=1;
	//coin
	coins = new collectable.Group();
	coins.tile = 'c';
	coins.spriteSheet = collectableImg;
	coins.addAni({ w:16, h:16, row:2 });
	Mario.overlapping(coins, collectItem);
	//time orb
	timeOrb = new collectable.Group();
	timeOrb.tile = 't';
	timeOrb.spriteSheet = collectableImg;
	timeOrb.addAni({ w:16, h:16, row:1, frames:8 });
	timeOrb.ani.frameDelay = 15;
	Mario.overlapping(timeOrb,collectItem);
	
	//checkpoint tile
	checkTile = new collectable.Group();
	checkTile.tile = '!';
	checkTile.spriteSheet = collectableImg;
	checkTile.addAni({ w:16, h:32, row:1.5, frames:2 })
	checkTile.ani.frameDelay = 15;
	checkTile.ani.offset.y = -10;
	Mario.overlapping(checkTile,collectItem);



	//The map
	new Tiles(
		[	'',
			'                                                                     c',
			'                                                                    56',
			'                                                                   ',
			'            54446',
			'               + 546                                 c                  ',
			'               =  +       c                         23',
			'           -   =  _      23                                    54446',
			'           _dt _  213        d                                  + +',
			'          21111113           23     23  23     211113           = =',
			'                                                 2111113     d  _t_ !',
			'                                                           21111111113',
			'',
			'                                                                          c',
			'                                                                          f',
			'',
			'   c',
			'   d                                                                f',
			'   f     5446',
			'          + -                                 c',
			'      f   = =                                 f                          f',
			'          _t_ b!                          f',
			'  b    d lgggggR    lg   b                                           lg',
			'  lR lgrrrrrrrrrR    rgggggR  f   f  lggggggggR     lR  f  f  f  f  lgrgggR' 
		],
		-70,
		-245,
		rock.w,
		rock.h

	);

}

function infoSprites(){
	//text info
	info = new Group()
	info.layer = -1;
	info.collider = ('static');
	info.overlapping(Mario);
	//beginerinfo
	beginInfo = new info.Sprite(25,25);
	beginInfo.w=0;
	beginInfo.h=0;
	//beginInfo.textSize = ;
	beginInfo.textColour = 'white';
	beginInfo.text = 'Arrow keys\nto move & jump';
	//first orb info
	firstOrb = new info.Sprite(145,90)
	firstOrb.w=0;
	firstOrb.h=0;
	firstOrb.text='what does this do?';
	//double jump
	doubleJump = new info.Sprite(1355,120)
	doubleJump.w=0;
	doubleJump.h=0;
	doubleJump.textColour = 'white';
	doubleJump.text = 'high jumps here\nI wonder what happens\nif you jump twice';
}

function setup() {
	new Canvas(250, 250);
	displayMode('maxed', 'pixelated',16);
	allSprites.pixelPerfect = true;

	world.gravity.y = 10;
	Mario = new Sprite(48, 100, 12, 16);
	Mario.friction = 0;
	Mario.bounciness = 0;
	Mario.rotationLock = true;
	Mario.drag = 0;
	Mario.spriteSheet = 'photos/characterSheet.png';
	Mario.addAnis({
		img: {row:0,col:0},
		idle: { row: 0, frames: 7},
		slowIdle: { row: 1, frames: 7},
		acelIdle: { row: 2, frames: 7},
		run: { row:3, frames:8},
		slowRun:{row:4,frames:8},
		acelRun:{row:5,frames:8}
	});
	Mario.changeAni('img');
	Mario.layer=2;
	
	titleImg = new Sprite(90,100)
	titleImg.rotationLock = true;
	endImg = new Sprite()
	endImg.rotationLock = true;
	endImg.visible = false;

	// enemies, WIP feaature not implemented
	/**enemies = new Group();
	enemies.w = 16;
	enemies.h = 16;
	enemies.rotationLock = true;
	
	enemy = new enemies.Sprite();
	enemy.tile = 'e';
	enemy.img = 'photos/mario.png';**/
	
	//checkpoints
	checkpoint = new Sprite(48, 100);
	checkpoint.collider = 'none';
	checkpoint.visible = false
	checkpoint.spriteSheet = collectableImg;
	checkpoint.addAni({ w:16, h:32,col:2, row:1.5, frames:2 })
	checkpoint.ani.frameDelay = 15;
	checkpoint.ani.offset.y = -10;
	checkpoint.layer = 0;



	//time ability bar in top left
	counter = new Sprite(0,10, 75,10);
	counter.collider = 'none';
	counter.color = 'l';
	counter.visible = false;

	//stats and atributes to do with the player
	lives=3;
	JumpY = -4;
	jumpCount = 0;
	maxTime = 100;
	timeAmount = maxTime;
	timeSlowable = false;
	bounces = 1;
	cloudy = false;
	orbScore =0;
	coinScore=0;
	tileSize=20;
	slowScale = 0.5;
	orbs = 0;
	recharge = false
	titleScreen = true;
	endScreen = false;
	/**for sensing ground beneath player
	taken from platformer on p5play**/
	groundSensor = new Sprite(48, 106, 6, 12, 'n');
	groundSensor.visible = false;
	groundSensor.mass = 0.01;
	
	/**eGroundSensor = new Sprite(enemy.x, enemy.y+10, 6, 12, 'n');
	eGroundSensor.visible = true;
	eGroundSensor.mass = 0.01;**/

	let j = new GlueJoint(Mario, groundSensor);
	j.visible = false;
	//let k = new GlueJoint(enemy, eGroundSensor);
	//k.visible = true;

	infoSprites()
	tiles()

}

//playermovement
function movement(){
	//Jumping
	if (groundSensor.overlapping(floor) || jumpCount < 1 ) {
		if (kb.presses('up') || kb.presses('space')) {
			
			Mario.vel.y = JumpY;
			jumpCount++;
			
		}
	}
	if (groundSensor.overlapping(timeClouds) && kb.pressing('c')) {
		if (kb.presses('up') || kb.presses('space')) {
			
			Mario.vel.y = JumpY;
			jumpCount++;
			
		}
	}
	if (groundSensor.overlapping(bouncyClouds) || jumpCount < 1) {
		if (kb.presses('up') || kb.presses('space')) {
			if(cloudy == true){
				Mario.vel.y = JumpY * 1.5;
			}
			else{
				Mario.vel.y=JumpY;
			}
			jumpCount++;
			bounces = 0;
		}
	}
	//left and right movement
	if (kb.pressing('left')){ 
		Mario.vel.x = -2;
		Mario.mirror.x = true;
		
	}
	else if (kb.pressing('right')){ 
		Mario.vel.x = 2;
		Mario.mirror.x = false;
	}
	else {
		Mario.vel.x = 0;
	}
	
	powers();
	effects();
}

//enemies *not working*
/**function enemyMovement(){
	if (enemy.colliding(grassRock) || enemy.colliding(cloud) && !enemy.mirror.x){
		enemy.vel.x = 0.5;
	}
	else if(enemy.vel.x == 0){
		mirror.x = true;
	}
	else if (enemy.mirror.x === true){
	   enemy.vel.x = -0.5;
	  
    }
    else if(enemy.vel.x == 0){
		mirror.x = false;
    }
}**/

//terrain/enviro effects
function effects(){
	//clouds / bouncing on bouncy clouds
	if (groundSensor.overlapping(floor) || groundSensor.overlapping(bouncyClouds)){
		jumpCount = 0;
		
	}
	if (groundSensor.overlapping(timeClouds) && kb.pressing('c')){
		jumpCount = 0;
		
	}

	if (bounces <3 && cloudy===true){
		Mario.bounciness =1;
	}
	else{
		Mario.bounciness = 0;
	}
	
	if (groundSensor.overlap(clouds)){
		bounces ++;
	}
}

//powers
function powers(){
	//Timeslow power
	if (timeSlowable===true){
		counter.visible = true;
		if (kb.pressing('c') && recharge === false) {
			world.timeScale = slowScale;
			timeClouds.opacity = 1;
			timeClouds.collide(Mario);
			
			if(orbs<2){
				timeAmount-=0.35;
				JumpY=-4;
				rightPilCloud.ani.frameDelay = 10;
				pilCloud.ani.frameDelay = 10;
				leftPilCloud.ani.frameDelay = 10;
			}
			else if (orbs<3){
				JumpY=-4.5;
				timeAmount-=0.25;
				rightPilCloud.ani.frameDelay = 5;
				pilCloud.ani.frameDelay = 5;
				leftPilCloud.ani.frameDelay = 5;
			}
			else if (orbs<4){
				JumpY=-5;
				timeAmount-=0.2;
				rightPilCloud.ani.frameDelay = 5;
				pilCloud.ani.frameDelay = 5;
				leftPilCloud.ani.frameDelay = 5;
			}
			
			if(accellerate===false){
				Mario.vel.x *=1.5;
			}
			else if(!kb.pressing('v')){
				Mario.vel.x *=1.5;
			}
			
		} else {
			world.timeScale = WORLDTIME;
			JumpY = -4;
			timeClouds.opacity = 0.8;
			timeClouds.overlapping(Mario);
			if(!accellerate){
				if (timeAmount <100){
					timeAmount += 0.125;
				}
			}
			else if(accellerate === true){
				if (timeAmount <125){
					timeAmount += 0.125;
				}
			}
		}
	}
	//Time acceleration power activate after slow
	if (accellerate===true){
		if (kb.pressing('v') && recharge === false) {
			world.timeScale = 0.75;
			timeAmount-=0.4;
			Mario.vel.x *=3;
			rightPilCloud.ani.frameDelay = 10;
			leftPilCloud.ani.frameDelay = 10;
			pilCloud.ani.frameDelay = 10;
			counter.text = 'gotta go fast';
		} 
		else {
			counter.text = '';
		}
	}
	else if (!accellerate){
		if (kb.pressing('v')){
			counter.textSize = 10;
			counter.text = ("power not unlocked yet");
		}
		else{
			counter.text = ''
		}
	}

	if (timeAmount<1){
		recharge = true;
		counter.color = 'red';
	}
	if (timeAmount>50){
		recharge = false;
		counter.color = 'l';
	}
}
function collectItem(Mario, item) {
	

	if(Mario.overlapping(coins)){
		collection.push("Coin");
		coinScore++;
		item.remove();
	}
 
	if(Mario.overlapping(timeOrb)){
        // First orb, timeslow
        if (!timeSlowable && orbScore == 0){
            collection.push("slow Orb");
            timeSlowable = true;
			orbScore++;
			firstOrb.textColour = 'white';
			firstOrb.text ='press c to use\nyour new power';
        }
		//second orb
		else if (orbScore == 1){
			collection.push("Time Orb+");
			slowScale = 0.4;
			orbScore++;
		}
		// third orb, accelerate
		else if (!accellerate && orbScore ==2){
			collection.push("accellerate Orb");
			accellerate = true;
			slowScale = 0.3;
			orbScore++;
			timeAmount = 125;
		}
		item.remove();
    }
	
	if(Mario.overlapping(checkTile)){
		checkpoint.x = item.x;
		checkpoint.y = item.y;
		lives = 3;
		checkpoint.visible = true;
		item.remove();
	}
}
function cameraRaise(){
	//camera goes up with mario
	if (Mario.y<-20){
		counter.x = Mario.x - 90;
		camera.y =-140;
		cloudy = true;
		middlePil.anis.offset.y =1;
		botPil.anis.offset.y =1;
		topPil.anis.offset.y =1;
		brokenPil.anis.offset.y =1;
		dRock.anis.offset.y =1;
		camera.x = Mario.x - 30;
	}
	else{
		counter.x = Mario.x - 30;
		camera.y=100;
		cloudy = false;
		middlePil.anis.offset.y =0;
		botPil.anis.offset.y =0;
		topPil.anis.offset.y =0;
		brokenPil.anis.offset.y =0;
		dRock.anis.offset.y =0;
		camera.x = Mario.x + 30;
	}
}

function death(){
	//mario falls
	if (Mario.y > 300) {
		Mario.speed = 0;
		Mario.x = checkpoint.x;
		Mario.y = checkpoint.y;
		lives--;
	}
	//WIP - not implemented yet
	if (lives<1){
		endScreen = true;

	}
}

//function checkPoints(){
	
//}

function aniChange(){
	if (Mario.vel.x==0&&Mario.vel.y==0 &&
		recharge === false&& 
		groundSensor.overlapping(floor) || 
		groundSensor.overlapping(bouncyClouds) || 
		groundSensor.overlapping(timeClouds)){
		if(kb.pressing('v') && accellerate === true ){
			Mario.changeAni('acelIdle');
		}
		else if(kb.pressing('c')&& timeSlowable === true){
			Mario.changeAni('slowIdle');
		}
		else{
		Mario.changeAni('idle');
		}
		Mario.ani.frameDelay = 9;
	}
	else{
		if(kb.pressing('v')&& accellerate === true && 
		(groundSensor.overlapping(floor) || 
		groundSensor.overlapping(bouncyClouds) || 
		groundSensor.overlapping(timeClouds)) &&
		recharge === false){
			Mario.changeAni('acelRun');
			Mario.ani.frameDelay = 0;
		}
		else if(kb.pressing('c')&& timeSlowable === true&& 
		(groundSensor.overlapping(floor) || 
		groundSensor.overlapping(bouncyClouds) || 
		groundSensor.overlapping(timeClouds)) &&
		recharge === false){
			Mario.changeAni('slowRun');
			Mario.ani.frameDelay = 4;
		}
		else{
			Mario.changeAni('run');
			Mario.ani.frameDelay = 5;
		}
		
	}
	
	Mario.ani.offset.y = 1;
	Mario.ani.offset.x = 2;
	
}

function draw() {
	
	Mario.spriteSheet = 'photos/characterSheet.png';
	if (titleScreen === true){
		titleImg.x = camera.x;
		titleImg.y = camera.y;
		titleImg.img = 'photos/titleScreen.png';
		titleImg.text= 'click to play!';
		
		titleImg.overlapping(Mario);
		if(mouseIsPressed){
			titleScreen = false;
			titleImg.visible = false;
			
		}
	}
	if (titleScreen === false && endScreen === false){	
		groundSensor.x = Mario.x;
		groundSensor.y=Mario.y+6;
		counter.w = timeAmount*0.75;
		counter.y=camera.y - 110;	
		timeOrb.frameDelay = 5;
		background('skyblue');
		movement();
		cameraRaise();
		//enemyMovement();
		death();
		aniChange();
		fill('gold');
		text('coins: ' + coinScore, 160, 30);
		fill('white');
		text('Lives: ' + lives, 160, 20);
		titleImg.overlapping(Mario);
		endImg.overlapping(Mario);
	}
	if (endScreen === true){
		endImg.visible = true;
		endImg.img = 'photos/gameOver.png';
		endImg.x = camera.x;
		endImg.y = camera.y;
		endImg.collider = 'none';
		endImg.overlapping(Mario);
		counter.visible = false;
		checkpoint.visible = false;
	}
	
		/**testing, used to move around the map quicker
		fill(255);
		Mario.textSize = 10;
		Mario.text=(round(mouse.x) +' ' +round(mouse.y)+' '+ round(Mario.vel.y));
		//Mario.text=(coinScore + collection + orbs);
		if (mouse.presses()){
			Mario.x = mouse.x;
			Mario.y = mouse.y;
			world.gravity = 0;
			Mario.vel.y = 0;
		}
		if(kb.presses('g')){
			world.gravity.y = 10;
		}**/
}
