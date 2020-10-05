//Create variables here
var dog,happyDog,database,foodS,foodStock;
var feedPet,addFood;
var fedTime,lastFed;
var foodObj;
var changeState,readState;
var bedroom,garden,washroom;
var gameState="Hungry";

function preload()
{
	//load images here
  dogImg=loadImage("images/Dog.png");
  happyDogImg=loadImage("images/happydog.png");
  sadDogImg=loadImage("images/dogImg.png");
  bedroom=loadImage("images/virtualPetImages/Bed Room.png");
  garden=loadImage("images/virtualPetImages/Garden.png");
  washroom=loadImage("images/virtualPetImages/Wash Room.png");
}

function setup() {
  database=firebase.database();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  console.log("foodS ",foodStock);

  // read gameState from db
  readState=database.ref('gameState');
  readState.on("value",(data)=>{
    gameState=data.val();
  });
  
	createCanvas(500, 500);
  dog=createSprite(250,250,10,10);
 // dog.addImage("dogImg",dogImg);
  dog.scale=0.1;
  happyDog=createSprite(250,250,10,10);
  // sadDog=createSprite(200,250,10,10);
 // happyDog.addImage("happyDogImg",happyDogImg);
  happyDog.scale=0.1;
  // sadDog.scale=0.1;

  foodObj=new Food();

  // creating button
  feedPet=createButton("Feed the Dog");
  feedPet.position(600,95);
  feedPet.mousePressed(feedDog);

  addFood=createButton("add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(rgb(46, 139, 87));
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function (data) {
    lastFed=data.val();
  })
  if(gameState!="Hungry"){
    feedPet.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feedPet.show();
    addFood.show();
    dog.addImage(dogImg);
  }
  foodObj.display();
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+ lastFed + " AM",350,30);
  }
  textSize(20);
  fill("white");
  text("Food remaining : ",150,180);
  if(foodS){
      fill("yellow");
      text(foodS,310,180);
  }
  if(foodS===0){
    textSize(20);
    fill("red");
    text(foodS,310,180);
    textSize(50);
    fill("blue");
    text("Game Over!!!",100,350);
      dog.addImage(dogImg);
  }
  currentTime=hour();
  if(currentTime===(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  
  drawSprites();
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog() {
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
