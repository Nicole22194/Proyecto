var bg,bgImg;
var player, osoImg, oso_escupiendo;
var enemigo, rocaImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var enemigoGroup;

var bulletImg

var bullets = 70;

var gameState = "fight"

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  bulletImg = loadImage("assets/bullet.png")


  osoImg = loadImage("assets/oso-1.png")
  oso_escupiendo = loadImage("assets/Oso-2.png")

  rocaImg = loadImage("assets/Enemigo.png")

  bgImg = loadImage("assets/bg.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //agregando la imagen de fondo 
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 0.3
  

//creando el sprite del jugador 
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(osoImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creando sprites para representar la vida sobrante
   heart1 = createSprite(displayWidth-150,40,20,20)
   //heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    //heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

    //creando un grupo para las balas
    bulletGroup = new Group()
    zombieGroup = new Group()
   

    //creando un grupo para los zombis
    enemigoGroup = new Group();
}

function draw() {
  background(0); 

  //moviendo al jugador arriba y abajo: volviéndolo compatible con juegos mobiles a traves de entrada táctil
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

// Liberar balas y cambiar la imagen del tirador a posición de tiro cuando se presiona la barra espaciadora.
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  //bullet.addImage(bulletImg)
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(oso_escupiendo)
  bullets = bullets-1
}


//liberar las balas y cambiar la imagen del tirador a posición de disparo cuando la barra espaciadora es presionada 
if(keyWentDown("space")){
  
  player.addImage(oso_escupiendo)
  
 
}

// Inicia el estado de juego (gameState) "bullet" cuando el jugador se queda sin balas. 
if(bullets==0){
  gameState = "bullet"
    
}

// Destruye al zombi cuando una bala lo toca
if(enemigoGroup.isTouching(bulletGroup)){
  for(var i=0;i<enemigoGroup.length;i++){     
      
   if(enemigoGroup[i].isTouching(bulletGroup)){
        enemigoGroup[i].destroy()
        bulletGroup.destroyEach()
       
        } 
  
  }
}


//el jugador regresa a la imagen de la posición original una vez que dejamos de presionar la barra espaciadora
else if(keyWentUp("space")){
  player.addImage(osoImg)
}


//destruir al zombi cuando el jugador lo toca
if(enemigoGroup.isTouching(player)){
 

 for(var i=0;i<enemigoGroup.length;i++){     
      
  if(enemigoGroup[i].isTouching(player)){
       enemigoGroup[i].destroy()
       } 
 }
}

//llamar a la función para generar zombis
enemy();

drawSprites();
}


// Destruye al jugador y al zombi. Muestra el mensaje en el estado de juego "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  enemigoGroup.destroyEach();
  player.destroy();

}

// Destruye al jugador y al zombi. Muestra el mensaje en el estado de juego "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  enemigoGroup.destroyEach();
  player.destroy();

}

// Destruye al jugador, al zombi y a las balas. Muestra el mensaje en el estado de juego "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  enemigoGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}




//creando la función para generar zombis
function enemy(){
  if(frameCount%50===0){

    //dando posiciones "x" e "y" aleatorias para la aparición de los zombis
    enemigo = createSprite(random(width+110,width+200),random(height/2-10,500),40,40)

    enemigo.addImage(rocaImg)
    enemigo.scale = 0.09
    enemigo.velocityX = -3
    enemigo.debug= true
    enemigo.setCollider("rectangle",0,0,400,400)
   
    enemigo.lifetime = 400
   enemigoGroup.add(enemigo)
  }

}
