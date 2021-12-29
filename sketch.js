const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var rope
var rock
var fruit
var backgroundtree
var con
var rocky
var check
var gameover

function preload() {
  rockImg = loadImage("rock.png");
  appleImg = loadImage("apple.png");
  backgroundtreeImg = loadImage("tree background.png");
  gameoverImg = loadImage("GAME OVER.png");
}

function setup() {
  createCanvas(900,600);

  engine = Engine.create();
  world = engine.world;
  
  var rock_options = {
    restitution: 0.8
  }

  rock = Bodies.circle(100,400,15,rock_options);
  World.add(world,rock);



  backgroundtree = createSprite(450,300)
  backgroundtree.addImage(backgroundtreeImg);
  backgroundtree.scale = 0.4

  apple = createSprite(840,60,20,20);
  apple.addImage(appleImg)
  apple.scale = 0.085

  rocky = createSprite(80,579,40,40)
  rocky.addImage(rockImg)
  rocky.scale = 0.1099

  gameover = createSprite(450,300)
  gameover.addImage(gameoverImg);
  gameover.visible = false;

  rope = new Rope(4,{x:343,y:333});
  con = new Link(rope, rock);
  check = true;
}


function draw() 
{
  background(51);
  Engine.update(engine);
  rocky.x = rock.position.x
  rocky.y = rock.position.y

  if(check == true && mouseDown()){
   // console.log("")
   Matter.Body.setPosition(rock, {x:mouseX,y:mouseY})
   Matter.Body.setVelocity(rock, {x:0,y:0})
  }

  if(mouseWentUp()){
    con.dettach()
    check = false

    // set velocity of rock
    
    var newX = rope.pointA.x - rock.position.x
    var newY = rope.pointA.y - rock.position.y
    var multiplier = 0.2
    Matter.Body.setVelocity(rock, {x:newX*multiplier, y:newY*multiplier})
  }
  
   if(rocky.isTouching(apple)){
     gameover.visible = true;
  }

  drawSprites();
  rope.show()

}

