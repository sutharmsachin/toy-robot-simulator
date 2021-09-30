import { Component,OnInit } from '@angular/core';
import RobotService from './robot.service'
const directions = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST'
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

 

export class HomePage   implements OnInit {


  public facing: string = "NORTH";
  public x: string = "0";
  public y: string = "0";
 
  // private robotElement:any;
  constructor(private robot: RobotService) {
     
  }

  ngOnInit() {
    //  console.log('Game Started')
    
  }
  renderCallback(that){
          
          let robotElement =  document.querySelector('.robot');
          if (that.placed) {
            robotElement.classList.add('placed');
        } else {
            robotElement.classList.remove('placed');
        }
        robotElement.setAttribute('data-direction', that.facing.toLowerCase());
        robotElement.setAttribute('style', `bottom: ${that.y * 20}%; left: ${that.x * 20}%`);
  }
  placeRobot(){
    this.robot.place(parseInt(this.x), parseInt(this.y), this.facing,this.renderCallback) 
  }
  turnLeft(){
    this.robot.left(this.renderCallback);
  }
  move(){
    this.robot.move(this.renderCallback);
  }
  turnRight(){
    this.robot.right(this.renderCallback);
  }

  report(){
    this.robot.report();
  }
}
