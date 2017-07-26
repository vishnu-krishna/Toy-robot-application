/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ViewChild } from '@angular/core';
import { RectangleGridComponent } from './rectangle-grid.component';

describe('RectangleGridComponent', () => {
  let component: RectangleGridComponent;
  let fixture: ComponentFixture<RectangleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RectangleGridComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app Rectangle Grid component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the grid', () => {
    const app = fixture.debugElement.componentInstance;
    let svg;
    app.ngOnInit();
    fixture.detectChanges();
    svg = fixture.nativeElement.querySelector('#grid-svg');
    expect(svg).toBeTruthy();
  });

  it('should have not created the robot when the grid is created', () => {
    const app = fixture.debugElement.componentInstance;
    let robot;
    app.ngOnInit();
    fixture.detectChanges();
    robot = fixture.nativeElement.querySelector('#robot-outer');
    expect(robot).toBeFalsy();
  });

  it('should place the robot', () => {
    const app = fixture.debugElement.componentInstance;
    let robot;
    app.createRobot();
    fixture.detectChanges();
    robot = fixture.nativeElement.querySelector('#robot-outer');
    expect(robot).toBeTruthy();
  });
  it('should turn the robot North', () => {
    const app = fixture.debugElement.componentInstance; let robotInner, attributes, oldTransformValue, Changedattribute, newTranformValue
    app.createRobot(0, 0, 0);
    fixture.detectChanges();
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    attributes = robotInner.attributes as NamedNodeMap;
    oldTransformValue = attributes.getNamedItem('transform').value;
    app.turnRobot();
    Changedattribute = robotInner.attributes as NamedNodeMap;
    newTranformValue = Changedattribute.getNamedItem('transform').value;
    expect(newTranformValue).not.toEqual(oldTransformValue);
    expect(newTranformValue).toEqual('rotate(90, 40, 360)');

  });
  it('should turn the robot East', () => {
    const app = fixture.debugElement.componentInstance; let robotInner, attributes, oldTransformValue, Changedattribute, newTranformValue
    app.createRobot(0, 0, 1);
    fixture.detectChanges();
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    attributes = robotInner.attributes as NamedNodeMap;
    oldTransformValue = attributes.getNamedItem('transform').value;
    app.turnRobot();
    Changedattribute = robotInner.attributes as NamedNodeMap;
    newTranformValue = Changedattribute.getNamedItem('transform').value;
    expect(newTranformValue).not.toEqual(oldTransformValue);
    expect(newTranformValue).toEqual('rotate(180, 40, 360)');

  });
  it('should turn the robot South', () => {
    const app = fixture.debugElement.componentInstance; let robotInner, attributes, oldTransformValue, Changedattribute, newTranformValue
    app.createRobot(0, 0, 2);
    fixture.detectChanges();
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    attributes = robotInner.attributes as NamedNodeMap;
    oldTransformValue = attributes.getNamedItem('transform').value;
    app.turnRobot();
    Changedattribute = robotInner.attributes as NamedNodeMap;
    newTranformValue = Changedattribute.getNamedItem('transform').value;
    expect(newTranformValue).not.toEqual(oldTransformValue);
    expect(newTranformValue).toEqual('rotate(270, 40, 360)');

  });
  it('should turn the robot West', () => {
    const app = fixture.debugElement.componentInstance;
    let robotInner, attributes, oldTransformValue, Changedattribute, newTranformValue
    app.createRobot(0, 0, 3);
    fixture.detectChanges();
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    attributes = robotInner.attributes as NamedNodeMap;
    oldTransformValue = attributes.getNamedItem('transform').value;
    app.turnRobot();
    Changedattribute = robotInner.attributes as NamedNodeMap;
    newTranformValue = Changedattribute.getNamedItem('transform').value;
    expect(newTranformValue).not.toEqual(oldTransformValue);
    expect(newTranformValue).toEqual('rotate(0, 40, 360)');
  });

  it('should report the robot coordinates x=0 and y=0 and direction to be west', () => {
    let robotOuter, outerAttributes, robotInner, innerAttributes, xValue, yValue, face
    const app = fixture.debugElement.componentInstance;
    app.createRobot(0, 0, 3);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    innerAttributes = robotInner.attributes as NamedNodeMap;
    xValue = outerAttributes.getNamedItem('data-x').value;
    yValue = outerAttributes.getNamedItem('data-y').value;
    face = innerAttributes.getNamedItem('data-face').value;

    app.getReport();
    expect(app.reportMessage).toEqual("X position at " + "\"" + "0" + "\" " + "Y position at " + "\"" + "0" + "\" " + "and facing the direction West");

  });

  it('should report the robot coordinates x=0 and y=0 and direction to be North', () => {
    let robotOuter, outerAttributes, robotInner, innerAttributes, xValue, yValue, face
    const app = fixture.debugElement.componentInstance;
    app.createRobot(0, 0, 0);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    innerAttributes = robotInner.attributes as NamedNodeMap;
    xValue = outerAttributes.getNamedItem('data-x').value;
    yValue = outerAttributes.getNamedItem('data-y').value;
    face = innerAttributes.getNamedItem('data-face').value;

    app.getReport();
    expect(app.reportMessage).toEqual("X position at " + "\"" + "0" + "\" " + "Y position at " + "\"" + "0" + "\" " + "and facing the direction North");

  });

  it('should report the robot coordinates x=0 and y=0 and direction to be East', () => {
    let robotOuter, outerAttributes, robotInner, innerAttributes, xValue, yValue, face
    const app = fixture.debugElement.componentInstance;
    app.createRobot(0, 0, 1);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    innerAttributes = robotInner.attributes as NamedNodeMap;
    xValue = outerAttributes.getNamedItem('data-x').value;
    yValue = outerAttributes.getNamedItem('data-y').value;
    face = innerAttributes.getNamedItem('data-face').value;

    app.getReport();
    expect(app.reportMessage).toEqual("X position at " + "\"" + "0" + "\" " + "Y position at " + "\"" + "0" + "\" " + "and facing the direction East");

  });

  it('should report the robot coordinates x=0 and y=0 and direction to be South', () => {
    let robotOuter, outerAttributes, robotInner, innerAttributes, xValue, yValue, face
    const app = fixture.debugElement.componentInstance;
    app.createRobot(0, 0, 2);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    innerAttributes = robotInner.attributes as NamedNodeMap;
    xValue = outerAttributes.getNamedItem('data-x').value;
    yValue = outerAttributes.getNamedItem('data-y').value;
    face = innerAttributes.getNamedItem('data-face').value;

    app.getReport();
    expect(app.reportMessage).toEqual("X position at " + "\"" + "0" + "\" " + "Y position at " + "\"" + "0" + "\" " + "and facing the direction South");

  });

  it('should move the robot to co-ordinates x=0 and y=1 for North direction', () => {
    const app = fixture.debugElement.componentInstance;
    let robotOuter, outerAttributes, robotInner, newTransform, newdataX, newdataY,
      newcoordX, newcoordY;
    app.createRobot(0, 0, 0);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    app.moveRobot();
    newTransform = outerAttributes.getNamedItem('transform').value;
    newdataX = outerAttributes.getNamedItem('data-x').value;
    newdataY = outerAttributes.getNamedItem('data-y').value;
    expect(newTransform).toEqual("translate(0,-80)");
    expect(newdataX).toEqual('0');
    expect(newdataY).toEqual('1');
  });

  it('should move the robot to co-ordinates x=1 and y=0 for East direction', () => {
    const app = fixture.debugElement.componentInstance;
    let robotOuter, outerAttributes, robotInner, newTransform, newdataX, newdataY,
      newcoordX, newcoordY;
    app.createRobot(0, 0, 1);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    app.moveRobot();
    newTransform = outerAttributes.getNamedItem('transform').value;
    newdataX = outerAttributes.getNamedItem('data-x').value;
    newdataY = outerAttributes.getNamedItem('data-y').value;
    expect(newTransform).toEqual("translate(80,0)");
    expect(newdataX).toEqual('1');
    expect(newdataY).toEqual('0');
  });
  it('should move the robot to co-ordinates x=0 and y=0 for South direction', () => {
    const app = fixture.debugElement.componentInstance;
    let robotOuter, outerAttributes, robotInner, newTransform, newdataX, newdataY,
      newcoordX, newcoordY;
    app.createRobot(0, 1, 2);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    app.moveRobot();
    newTransform = outerAttributes.getNamedItem('transform').value;
    newdataX = outerAttributes.getNamedItem('data-x').value;
    newdataY = outerAttributes.getNamedItem('data-y').value;
    expect(newTransform).toEqual("translate(0,80)");
    expect(newdataX).toEqual('0');
    expect(newdataY).toEqual('0');
  });
  it('should move the robot to co-ordinates x=0 and y=0 for West direction', () => {
    const app = fixture.debugElement.componentInstance;
    let robotOuter, outerAttributes, robotInner, newTransform, newdataX, newdataY,
      newcoordX, newcoordY;
    app.createRobot(1, 0, 3);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    app.moveRobot();
    newTransform = outerAttributes.getNamedItem('transform').value;
    newdataX = outerAttributes.getNamedItem('data-x').value;
    newdataY = outerAttributes.getNamedItem('data-y').value;
    expect(newTransform).toEqual("translate(-80,0)");
    expect(newdataX).toEqual('0');
    expect(newdataY).toEqual('0');
  });
  it('should throw error message when traversing from x=4 and the x,y and  co-ordinate values should not be changed', () => {
    const app = fixture.debugElement.componentInstance;
    let robotOuter, outerAttributes, robotInner, newTransform, newdataX, newdataY,
      newcoordX, newcoordY, error;
    app.createRobot(4, 0, 1);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    app.moveRobot();
    expect(app.showError).toBeTruthy();
    newTransform = outerAttributes.getNamedItem('transform').value;
    newdataX = outerAttributes.getNamedItem('data-x').value;
    newdataY = outerAttributes.getNamedItem('data-y').value;

    expect(newTransform).toEqual("translate(0,0)");
    expect(newdataX).toEqual('4');
    expect(newdataY).toEqual('0');
  });
  it('path should not exist when the face value is 4 or above', () => {
    const app = fixture.debugElement.componentInstance;
    let robotOuter, outerAttributes, robotInner, newTransform, newdataX, newdataY,
      newcoordX, newcoordY, error;
    app.createRobot(0, 0, 4);
    fixture.detectChanges();
    robotOuter = fixture.nativeElement.querySelector('#robot-outer');
    outerAttributes = robotOuter.attributes as NamedNodeMap;
    robotInner = fixture.nativeElement.querySelector('#robot-inner');
    app.moveRobot();
    expect(app.noSuchPath).toBeTruthy();
  });
});
