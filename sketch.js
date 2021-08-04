const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,button1,button2,blower;
var bunny;
var blink,eat,sad;
var mute_btn;
var shelf

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var bubble,bubbleImg
var inside, insideImg

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

 bubbleImg = loadAnimation("Bubble.png")
 insideImg = loadAnimation("inside.png") 

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   if(isMobile){ 
     canW = displayWidth; 
    canH = displayHeight;
     createCanvas(displayWidth+80, displayHeight);
   } else {
      canW = windowWidth;
     canH = windowHeight;
      createCanvas(windowWidth, windowHeight); }
 
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,230);
  button.size(50,50);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(400,300);
  button1.size(50,50);
  button1.mouseClicked(drop1);


  mute_btn = createImg('mute.png');
  mute_btn.position(700,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(7,{x:240,y:230});
  rope1 = new Rope(7,{x:420,y:300});


  ground = new Ground(200,canH,canW+1000,20);
  shelf = new Ground(410,130, 100,10)

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(430,60,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope1,fruit);

  
 bubble = createSprite(480,500,50,50)
  bubble.addAnimation("pop", bubbleImg)
  bubble.addAnimation("blast",insideImg)
  bubble.changeAnimation("pop")
  bubble.scale = 0.3
//var options = { 
 // isStatic:true }

 // bubble = Bodies.circle(480,500,40,options)
  //World.add(world,bubble)
  
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

 /* push()
  imageMode(RADIUS)
  image(bubbleImg, bubble.position.x,bubble.position.y, 60 ,60)
  pop()*/

  push();
  imageMode(CENTER);
  if(fruit!=null){
    fill("blue")
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope1.show();
 

  Engine.update(engine);
  ground.show();
 
  shelf.show()
 

  

  if(collide(fruit,bunny,80)==true)
  {
    bunny.changeAnimation('eating');
    World.remove(world,fruit)
    fruit = null
    
    bubble.visible = false
    eating_sound.play();
  }
  
  if(collide(fruit,bubble,40)==true)
  {
    engine.world.gravity.y =  - 1
    // fruit.position.x = bubble.position.x
     //fruit.position.y = bubble.position.y
     bubble.x = fruit.position.x
     bubble.y = fruit.position.y
  }


  if(fruit!=null && fruit.position.y>=700)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    World.remove(engine.world,fruit)
    fruit=null;

  
     
   }
   drawSprites();
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}
function drop1()
{
  cut_sound.play();
  rope1.break();
  fruit_con1.detach();
  fruit_con1 = null; 
}


function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


