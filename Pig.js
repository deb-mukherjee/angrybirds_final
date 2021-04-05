class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,50,50);
    this.image = loadImage("sprites/enemy.png");
    this.death = false;
    this.visibility=255;
  }
  display(){
    if (this.body.speed<2.5){
      super.display();
    }
    else if(this.body.speed>2.5 && this.body.speed<5 && this.death ===false){
      this.image = loadImage("sprites/InjuredPig.png")
      //score =score+10;
    }
    else{
      this.death = true;
      World.remove(world,this.body);
      push();
      this.visibility = this.visibility-5;
      tint(255,this.visibility);
      //image(this.image,this.body.position.x,this.body.position.y,50,50)
      pop();
    }


  }
  score(){
    if(this.visibility<0 && this.visibility>-505){
      score++;
    }


  }
}