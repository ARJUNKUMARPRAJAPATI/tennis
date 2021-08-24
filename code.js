var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerpaddle = createSprite(200,350,60,10);
playerpaddle.shapeColor = "red";

var computerpaddle = createSprite(200,50,60,10);
computerpaddle.shapeColor = "blue";

var ball = createSprite(200,200,20,20);
ball.shapeColor = "black";

var goal1 = createSprite(200,380,100,30);
goal1.shapeColor = "yellow";

var goal2 = createSprite(200,20,100,30);
goal2.shapeColor = "yellow";

var gamestate = "serve";

var pscore = 0;
var cscore = 0;

var line1 = createSprite(200,395,400,8);
line1.shapeColor = "red";

var line2 = createSprite(200,5,400,8);
line2.shapeColor = "red";

var line3 = createSprite(5,200,8,400);
line3.shapeColor = "red";

var line4 = createSprite(395,200,8,400);
line4.shapeColor = "red";


function draw() {
  background("green");
  
  createEdgeSprites();
  
  playerpaddle.bounceOff(line1);
  playerpaddle.bounceOff(line2);
  playerpaddle.bounceOff(line3);
  playerpaddle.bounceOff(line4);
  
  computerpaddle.x = ball.x;
  if (ball.bounceOff(line1) || ball.bounceOff(line2)) {
    playSound("assets/category_hits/8bit_splat.mp3");
  }
  if (ball.bounceOff(line3) || ball.bounceOff(line4)) {
    playSound("assets/category_hits/8bit_splat.mp3");
  }
  
  
  if(keyDown("left"))
  {
    playerpaddle.x = playerpaddle.x - 10;
  }
  
  if(keyDown("right"))
  {
    playerpaddle.x = playerpaddle.x + 10;
  }
  
  if(ball.isTouching(playerpaddle) || ball.isTouching(computerpaddle))
  {
    playSound("assets/category_hits/retro_game_simple_impact_3.mp3", false);
    ball.bounceOff(playerpaddle);
    ball.bounceOff(computerpaddle);
  }
  
  if(gamestate === "serve")
  {
    fill("red");
    textSize(20);
    text("Press space to serve",110,227);
  }
  
  if(keyDown("space") && gamestate === "serve")
  {
    gamestate = "play";
    serve();
  }
  
  
  if(cscore === 5 ||  pscore === 5)
  {
    gamestate = "over";
    fill("white");
    textSize(20);
    text("GAME OVER!",140,150);
    text("Press R to restart",130,240);
    
  }
  
  
 
  
  
  drawSprites();
}




function serve(){
  
  ball.velocityX = 7;
  ball.velocityY = 7;
  
}

function gamecount(){
  if(ball.isTouching(goal1) || ball.isTouching(goal2)){
   playSound("assets/category_digital/boing_2.mp3");
   
   if(ball.isTouching(goal1))
   {
     reset();
     cscore = cscore + 1;
     gamestate = "serve";
   }
   
   if(ball.isTouching(goal2))
   {
     reset();
     pscore = pscore + 1;
     gamestate = "serve";
   }
  }
}

function reset()
{
ball.velocityX = 0;
ball.velocityY = 0;
ball.x = 200;
ball.y = 200;
}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
