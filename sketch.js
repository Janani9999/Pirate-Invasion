const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, ground;
var bgImg
var canon
var canonBall
var balls = []
var array1 = [4, 21, 11]
var boats = []

for (var i = 0; i < array1.length; i++) {
  console.log(array1[i])
}

function preload() {
  bgImg = loadImage("./assets/background.gif")

  towerImg = loadImage("./assets/tower.png")
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  rectMode(CENTER)
  angleMode(DEGREES)
  angle = 15

  options = {
    isStatic: true


  }


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(150, 350, 100, 300, options)
  World.add(world, tower);

  canon = new Canon(80, 100, 150, 150, 15)





}

function draw() {
  background(bgImg);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);



  push()
  imageMode(CENTER)
  image(towerImg, tower.position.x, tower.position.y, 100, 300)
  pop()
  showBoats()



  for (var i = 0; i < balls.length; i++) {
    showCanonBalls(balls[i], i);
    collisionWithBoat(i)
  }

  
  canon.show()

}

function collisionWithBoat(index) {
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body)
      console.log("collision")
    }
  }
}


function keyPressed() {
  if (keyCode === 32) {
    canonBall = new CanonBall(canon.x, canon.y, 20)
    canonBall.trajectory = []
    Matter.Body.setAngle(canonBall.body, canon.angle)
    balls.push(canonBall)
  }
}


function showCanonBalls(canonBall, i) {
  canonBall.show()
}

function showBoats() {
  if (boats.length > 0) {

    if (boats[boats.length - 1].body.position.x < width - 300 || boats[boats.length - 1] === undefined) {
      var positions = [-40, -60, -70, -20]
      var position = random(positions)
      var boat = new Boat(width, height - 100, 170, 170, position)
      boats.push(boat)
    }
    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, { x: -1, y: 0 })
        boats[i].display()
      }

      else {
        boats[i]
      }

    }

  }
  else {
    boat = new Boat(1000, 500, 200, 150, -80)
    boats.push(boat)
  }
}

//index is the position of the canonball
//i is the position of the boat


function keyReleased() {
  if (keyCode == 32) {
    balls[balls.length - 1].shoot()
  }
}