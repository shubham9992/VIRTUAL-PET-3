//Create variables here
var dog,happyDog,database,foodS,foodStock;
function preload()
{
	//load images here
  dogImg=loadImage("images/Dog.png");
  happyDogImg=loadImage("images/happydog.png");
}

function setup() {
  database=firebase.database();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  console.log("foodS ",foodStock);
	createCanvas(500, 500);
  dog=createSprite(250,250,10,10);
  dog.addImage("dogImg",dogImg);
  dog.scale=0.1;
  happyDog=createSprite(250,250,10,10);
 // happyDog.addImage("happyDogImg",happyDogImg);
  happyDog.scale=0.1;

}


function draw() {  
  background(rgb(46, 139, 87));
  textSize(20);
  fill("white");
  //text("Food remaining : "+foodS,150,180);
  text("Food remaining : ",150,180);
  if(foodS){
      fill("yellow");
      text(foodS,310,180);
  }
  
  //add styles here
  if(keyWentDown(UP_ARROW)&&foodS!==0){
      writeStock(foodS);
      dog.visible=false;
      happyDog.addImage(happyDogImg);
  }
     
  
  if(foodS===0){
    textSize(20);
    fill("red");
    text(foodS,310,180);
    textSize(50);
    fill("blue");
    text("Game Over!!!",100,350);
     happyDog.visible=false;
      dog.addImage(dogImg);
      dog.visible=true;
  }
  drawSprites();
  textSize(18);
  fill("yellow");
  text("NOTE:",40,50);
  fill("white");
  // stroke(10);
  text("Press UP_ARROW key To Feed \"Drago Milk\"",100,50);
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


