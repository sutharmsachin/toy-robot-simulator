import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import RobotService from './robot.service'
let component: HomePage;
let fixture: ComponentFixture<HomePage>;
let element: HTMLElement;
 

function renderCallback(that) {
  let robotElement = element.querySelector('.robot');
  if (that.placed) {
    robotElement.classList.add('placed');

  } else {
    robotElement.classList.remove('placed');
  }
  console.log(that)
  if (that.facing !== undefined) {
    robotElement.setAttribute('data-direction', that.facing.toLowerCase());
    robotElement.setAttribute('style', `bottom: ${that.y * 20}%; left: ${that.x * 20}%`);
  }
}

beforeEach(waitForAsync(() => {
  TestBed.configureTestingModule({
    declarations: [HomePage],
    providers: [RobotService],
    imports: [IonicModule, FormsModule]
  }).compileComponents();

  fixture = TestBed.createComponent(HomePage);
  component = fixture.componentInstance;
  element = fixture.nativeElement;
  fixture.detectChanges();
}));




describe('Toy Robot Simulator - Move Test Cases', () => {
  it('should set robot place to false', () => {
      expect(new RobotService().place(0,0,'NORTH',renderCallback).remove(renderCallback).placed).toEqual(false);
  });
});


describe('Toy Robot Simulator - Left Test Cases', () => {
  it('should return the correct  direction when rotating left after being placed the robot', () => {
    const rupa = new RobotService();

    //  Rotate to 360
    expect(rupa.place(0,0, 'NORTH',renderCallback).right(renderCallback).facing).toEqual('EAST');
    expect(rupa.place(0,0, 'NORTH',renderCallback).right(renderCallback).right(renderCallback).facing).toEqual('SOUTH');
    expect(rupa.place(0,0, 'NORTH',renderCallback).right(renderCallback).right(renderCallback).right(renderCallback).facing).toEqual('WEST');
    expect(rupa.place(0,0, 'NORTH',renderCallback).right(renderCallback).right(renderCallback).right(renderCallback).right(renderCallback).facing).toEqual('NORTH');

    // Random Rotate
    expect(rupa.place(0,0, 'WEST',renderCallback).right(renderCallback).facing).toEqual('NORTH');
    expect(rupa.place(0,0, 'SOUTH',renderCallback).right(renderCallback).facing).toEqual('WEST');
    expect(rupa.place(0,0, 'EAST',renderCallback).right(renderCallback).right(renderCallback).facing).toEqual('WEST');
    expect(rupa.place(0,0, 'NORTH',renderCallback).right(renderCallback).right(renderCallback).right(renderCallback).facing).toEqual('WEST');
});

});

describe('Toy Robot Simulator - Right Test Cases', () => {
  it('should return the correct  direction when rotating right after being placed the robot', () => {
      const rupa = new RobotService();

       //  Rotate to 360
      expect(rupa.place(0,0, 'NORTH',renderCallback).left(renderCallback).facing).toEqual('WEST');
      expect(rupa.place(0,0, 'NORTH',renderCallback).left(renderCallback).left(renderCallback).facing).toEqual('SOUTH');
      expect(rupa.place(0,0, 'NORTH',renderCallback).left(renderCallback).left(renderCallback).left(renderCallback).facing).toEqual('EAST');
      expect(rupa.place(0,0, 'NORTH',renderCallback).left(renderCallback).left(renderCallback).left(renderCallback).left(renderCallback).facing).toEqual('NORTH',renderCallback);

     // Random Rotate
      expect(rupa.place(0,0, 'WEST',renderCallback).left(renderCallback).facing).toEqual('SOUTH');
      expect(rupa.place(0,0, 'SOUTH',renderCallback).left(renderCallback).facing).toEqual('EAST');
      expect(rupa.place(0,0, 'EAST',renderCallback).left(renderCallback).left(renderCallback).facing).toEqual('WEST');
      expect(rupa.place(0,0, 'NORTH',renderCallback).left(renderCallback).left(renderCallback).left(renderCallback).facing).toEqual('EAST');
  });
});


describe('Toy Robot Simulator - place, move, left, right', () => {
  it('should return the correct  facing direction after multiple operations', () => {
      const rupa = new RobotService();
    console.log('All Simul')
      expect(rupa.place(0,0,'NORTH',renderCallback)
          .move(renderCallback)
          .right(renderCallback)
          .move(renderCallback)
          .move(renderCallback)
          .left(renderCallback)
          .move(renderCallback).facing).toEqual('NORTH');
  });
});

describe('Toy Robot Simulator - Report Test Cases', () => {
   
  it('should create the home page', () => {
    expect(component).toBeTruthy();
  });


  it('should render log box', () => {
    const placeButton = element.querySelector('.log');
    expect(placeButton.innerHTML).toEqual('');
  });

  it('should run console.log for report', () => {
    const logSpy = spyOn(console, "log");
    const danny = new RobotService();
    const dennis = new RobotService();
    danny.place(0, 0, 'NORTH', renderCallback).report();
    dennis.place(1, 2, 'SOUTH', renderCallback).report();
    expect(logSpy).toHaveBeenCalled();
  });

  it('should run console.log 6 times for two robots', () => {
    // Ensure that console log is run when report() is fired
    const logSpy = spyOn(console, "log");
    const danny = new RobotService();
    const dennis = new RobotService();
    danny.place(0, 0, 'NORTH', renderCallback).report().move(renderCallback).report().left(renderCallback).report();
    // dennis.place(1, 2, 'SOUTH', renderCallback).report().left(renderCallback).move(renderCallback).right(renderCallback).move(renderCallback).report();

    expect(logSpy).toHaveBeenCalledTimes(6)
  });

  it('should log that the robot is not on the table when moves are attemped', () => {
    const logSpy = spyOn(console, "log");

    const steven = new RobotService();
    steven.move(renderCallback).move(renderCallback).right(renderCallback).left(renderCallback);
    // expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy).toHaveBeenCalledWith('I\'m not on the table! use .place(x, y, direction) to place me.');
  });
});