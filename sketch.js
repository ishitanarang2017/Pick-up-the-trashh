var bg,bgsprite;
var human,man;
var flowerimg,trashimg,goimg,fireimg;
var trashgroup=[]
var firegroup
var score = 0
var gamestate="play"
//var count = 0
//var prev = 0
function preload(){
  bg=loadImage("anime.jpg");
  man=loadAnimation("man1.png","man2.png", "m1.png", "man3.png")
  flowerimg=loadImage("flower.png")
  trashimg=loadImage("Trash.png")
  fireimg=loadImage("fire.png")
  goimg=loadImage("gameover.jpg")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  bgsprite=createSprite(width/2, height/2, width, height);
  bgsprite.addImage(bg);
  bgsprite.velocityX=-3;
  human=createSprite(300,height-50,50,50);
  human.addAnimation("walking",man);
  human.debug=true;
  human.setCollider("rectangle",-20,0,10,50)
  firegroup=new Group()
  
}

function draw() {
  background(255,255,255);
  if(gamestate=="play"){
    if(bgsprite.x<-300){
      bgsprite.x=width/2
    }  
    spawnTrash();
    spawnFire();
  
    for(var i=trashgroup.length-1;i>=0;i--){
      //count = i;
      if(trashgroup[i].isTouching(human)){
        trashgroup[i].addImage(flowerimg)
        trashgroup[i].scale=0.1
       // if(count!=prev){
          score += 10;
       // }
        
      }
     // prev = count;
    }
    
      if(keyDown("UP_ARROW")){
        human.y-=2;
      }
      if(keyDown("DOWN_ARROW")){
        human.y+=2;
      }
      if(firegroup.isTouching(human)){
        gamestate="over";
  
      }
    console.log(bgsprite.x)
    drawSprites();
   
  }
  else{
    bgsprite.velocityX=0;
    bgsprite.addImage(goimg);
    firegroup.destroyEach();
    trashgroup=[];
    human.destroy();
  }
  textSize(35);
    fill("white")
    text("Score: "+score,width-300,100);
}
function spawnTrash(){
  if(frameCount%250==0){
    var rand=Math.round(Math.random(1,2));
    var y
    if(rand==1){
      y=height-50
    } else{
      y=height-350
    }

    
    var trash=createSprite(width,y,50,50);
    trash.addImage(trashimg);
    trash.scale=0.2;
    trash.velocityX=-3;
    trash.debug=true;
    trash.setCollider("rectangle",0,0,10,10)
    //trashgroup.add(trash)
    trashgroup.push(trash)
  }

}
function spawnFire(){
  if(frameCount%750==0){
    var rand=Math.round(Math.random(1,2));
    var y
    if(rand==1){
      y=height-50
    } else{
      y=height-250
    }

    
    var trash=createSprite(width,y,50,50);
    trash.addImage(fireimg);
    trash.scale=0.8;
    trash.velocityX=-3;
    trash.debug=true;
    trash.setCollider("rectangle",0,0,100,100)
    firegroup.add(trash)
    //firegroup.push(trash)
  }
}
