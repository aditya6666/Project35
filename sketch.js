var dog, dogImage;;
var happyDog, happyDogImage;
var database;
var foodS;
var foodStock;
function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(200,300);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  drawSprites();
  fill("white");
  text("Food remaining: " + foodS, 150, 200);
  textSize(10);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",120,20);
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x = 0;
  } else{
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
})
}


