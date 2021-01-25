class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,100);
    car2 = createSprite(300,100);
    car3 = createSprite(500,100);
    car4 = createSprite(700,100);
    cars =[car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    console.log(allPlayers);
    if(allPlayers != undefined){
      console.log("line43");
      var x = 0;
      var y = 0;
      var index = 0;
      // var display_position = 130;
      for(var plr in allPlayers){
        x = x+200
        y = displayHeight-allPlayers[plr].distance;
        index = index+1;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index===player.index){
          cars[index-1].shapeColor = "red";
          camera.position.y = cars[index-1].y;
          camera.position.x = displayWidth/2;
        }
        
        // if (plr === "player" + player.index)
        //   fill("red")
        // else
        //   fill("black");
        // display_position+=20;
        // textSize(15);
        // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    console.log(player.index);

    if(keyDown(UP_ARROW) && player.index != null){
      player.distance +=50;
      player.update();
      console.log("test");
    }
    drawSprites();
  }
}
