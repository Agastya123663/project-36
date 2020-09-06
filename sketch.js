//Create variables here
var dog , database , happyDog , foodS, dogImage;
var foodObject;
var dinner =  "";
var lunch = "";
var breakfast = ""
var bg = "virtual pet images/bg.png";
var backgroundImg
var playText = "";
var wash = "";
var sleep = "";
var takeVaccine = 1;
var vaccineDone = 2;
var takeClin = 3;
var vacc = "";
var clinic;


function preload()
{
dogImage = loadImage("images/dog.png");

happyImage = loadImage("images/happyDog.png");

washroom = loadImage("virtual pet images/WashRoom.png");

clinicImg = loadImage("virtual pet images/clinic.jpg");
}

function setup() {
  createCanvas(500, 500);
  
   database = firebase.database();
   var foodStock = database.ref('Food');
   foodStock.on("value", readPosition);

   

   dog = createSprite(250,350,10,10);
   dog.scale = 0.2;
   dog.addImage("dog" , dogImage)
  
   database = firebase.database();
  
   foodObject = new Food()


   feed = createButton("Feed the dog");
   feed.position(450,95);
   feed.mousePressed(feedDog);

   addFood = createButton("Add Food");
   addFood.position(650,95);
   addFood.mousePressed(addFoods);

   takeClinic = createButton("Take Clinic");
   takeClinic.position(650,95);
   takeClinic.mousePressed(goVac);
   takeClinic.hide();

   exitVacc = createButton("Exit Clinic");
   exitVacc.position(652.5,95);
   exitVacc.mousePressed(takeVaci);
   exitVacc.hide();

   

  var clinic =  createSprite(250,250,10,10);
  clinic.addImage(clinicImg);
  clinic.visible = false;
   

}


function draw() {  

  if(backgroundImg){
    background(backgroundImg);
    }



 fill("black")
 text(dinner , 100,100);
 text(lunch , 100,100)
 text( breakfast, 100,100)
 text(playText , 100,100);
 text(wash , 100,100);
 text(sleep,100,100);
 

 drawSprites();

 getBackgroundImage();

 foodObject.display();

 text(vacc , 20,20);

}

function readPosition(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS)

}

function writePosition(x){
  if(x <=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').set({
    'Food' : x
  });
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food : foodS
  })

}

function feedDog(){
  dog.addImage("dog",happyImage)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref('/').update({
  Food:foodObject.getFoodStock()
 })
}

async function getBackgroundImage(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

 
  
  var dateTime = responseJSON.datetime;


  var hour = dateTime.slice(11,13);

   if(hour>=08 && hour<=11){
    breakfast = "BREAKFAST TIME !! , FEED TOTO 1 BOTTLE OF MILK"
    bg = "virtual pet images/dining room.png";
    dog.y = 220;
   }
   else if(hour>=13 && hour<=15){
    lunch = "LUNCH TIME !! , FEED TOTO 3 BOTTLES OF MILK"
    bg = "virtual pet images/dining room.png";
    dog.y = 220
   }
   else if(hour>=20 && hour<=23){
     dinner = "DINNER TIME !! , FEED TOTO 2 BOTTLES OF MILK"
     bg = "virtual pet images/dining room.png";
     dog.y = 220;
   }
   else if(hour>= 17 && hour<=18){
     bg = "virtual pet images/Garden.png";
     dog.visible = false;
     addFood.hide();
     feed.hide();
     playText = "PLAY TIME !! , TAKE HIM FOR A BATH AT 6PM",100,100;
    }
   else if(hour>=23 && hour<=08){
     bg = "virtual pet images/Bed Room.png";
     dog.visible = false;
     sleep = "Toto is sleeping right now , wake him up at 8pm"
    
     addFood.hide();
     feed.hide();
   }
   else if(hour>=18 && hour<=19){
    bg = "virtual pet images/WashRoom.png";
    dog.visible = false;
    addFood.hide();
    feed.hide();
    wash = "Toto is having a bath right now !!"
   }
   else{
     background(46,139,87);
     addFood.hide();
     feed.hide();
     takeClinic.show();
     
  
   }
   backgroundImg = loadImage(bg);
     
   }
  
function goVac(){
  gameState = takeClin;
  if(gameState === takeClin){
    clinic =  createSprite(250,250,10,10);
    clinic.addImage(clinicImg);
    clinic.visible = true;
    takeClinic.hide();
    exitVacc.show();
    vacc = "TOTO IS IN THE HOSPITAL TAKING A VACCINE , HE WILL BE DONE IN 30 MINUTES"
    background(0);
  }
}


function takeVaci(){
  gameState = vaccineDone
  if(gameState === vaccineDone){
    exitVacc.hide();
    takeClinic.show();
    clinic.visible = false;
    vacc = "";
    background(46,139,87);
  }
}

