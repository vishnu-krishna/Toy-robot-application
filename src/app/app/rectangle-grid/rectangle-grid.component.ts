import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-rectangle-grid',
  templateUrl: './rectangle-grid.component.html',
  styleUrls: ['./rectangle-grid.component.css']
})
export class RectangleGridComponent implements OnInit {
  //Fetching the elements from the html
  @ViewChild('grid') private gridContainer: ElementRef;
  @ViewChild('svg') private svgContainer: ElementRef;
  @ViewChild('x') private x: ElementRef;
  @ViewChild('y') private y: ElementRef;
  @ViewChild('face') private face: ElementRef;
  @ViewChild('turn') private turn: ElementRef;

  private svg: any;
  private gridWidth: any;
  private rectNumber: number = 5;
  private rectWidth: number;
  private reportMessage: string;
  private showReport: boolean = false;
  private showError: boolean = false;
  private showOtherSections: boolean = false;
  private noSuchPath: boolean = false;
  private showErrorMessage: string;
  private coOrdinates: Array<number> = [0, 1, 2, 3, 4];
  private direction: Array<any> = [{ id: 0, value: "North" }, { id: 1, value: "East" }, { id: 2, value: "South" }, { id: 3, value: "West" }];
  private turnDirection: Array<any> = [{ id: 1, value: "Right" }, { id: -1, value: "Left" }];
  constructor() { }

  ngOnInit() {
    this.createGrid();
    this.gridWidth = (<HTMLInputElement>document.getElementById('grid-svg')).getAttribute('width');
    this.rectWidth = this.gridWidth / this.rectNumber;
  }
  //Clear the alert and success messages.
  clearMessages() {
    this.showError = false;
    this.showReport = false;
  }
  // create the grid when the application is loaded.
  createGrid() {
    let width = 400, height = 400, grid = 5, rectWidth, i, dataX, dataY, rectX, rectY, fillColor = "#ECF0F1", strokeColor = "#34495E",
      element = this.gridContainer.nativeElement;
    // Build square SVG grid with rectangles
    this.svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('id', 'grid-svg');

    rectWidth = (width / grid) * 0.99;

    for (i = 0; i < grid * grid; i++) {
      dataX = i % 5;
      dataY = Math.floor(i / grid);
      rectX = rectWidth * dataX;
      rectY = width - (rectWidth * (dataY + 1));

      this.svg.append('rect')
        .attr('x', rectX)
        .attr('y', rectY)
        .attr('width', rectWidth)
        .attr('height', rectWidth)
        .attr('fill', fillColor)
        .attr('stroke', strokeColor)
        .attr('stroke-width', '1')
        .attr('data-x', dataX)
        .attr('data-y', dataY);
    }
  }
  //create the robot when you place the robot in the position and direction.
  createRobot(x: number, y: number, face: number) {
    let svg, width, height, rectWidth, rectNumber, centerX, centerY,
      metalColor = '#2C3E50', whiteColor = '#FFFED6', headColor = '#C0392B', radius, strokeWidth, robotOuter, robotInner, robotOuterElement;
    robotOuterElement = (<HTMLInputElement>document.getElementById('robot-outer'));
    //if already the robot is present clear that.
    if (robotOuterElement !== null) {
      robotOuterElement.remove();
    }
    //clear the messages.
    this.clearMessages();
    //Create the robot here
    svg = (<HTMLInputElement>document.getElementById('grid-svg'))
    width = svg.getAttribute('width');
    height = svg.getAttribute('height')
    rectWidth = width / 5;
    rectNumber = svg.children.length;
    centerX = x * rectWidth + rectWidth / 2;
    centerY = height - y * rectWidth - rectWidth / 2;
    radius = rectWidth / 6;
    strokeWidth = 4;

    // Group to keep all robot parts together
    robotOuter = d3.select('#grid-svg')
      .append('g')
      .attr('id', 'robot-outer')
      .attr('data-x', x)
      .attr('data-y', y)
      .attr('transform', 'translate(0, 0)');

    // Nested group to keep translate and rotate transforms separate
    robotInner = robotOuter.append('g')
      .attr('id', 'robot-inner')
      .attr('data-face', face);

    // robotInners' head
    robotInner.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', radius)
      .attr('fill', metalColor);
    robotInner.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', strokeWidth)
      .attr('fill', headColor);
    // robotInner's antenna
    robotInner.append('line')
      .attr('x1', centerX)
      .attr('y1', centerY - radius)
      .attr('x2', centerX)
      .attr('y2', centerY - radius * 2)
      .attr('stroke', metalColor)
      .attr('stroke-width', strokeWidth);
    robotInner.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY - radius * 2)
      .attr('r', strokeWidth)
      .attr('fill', headColor);
    robotInner.attr('transform', 'rotate(' + (face * 90).toFixed() + ', ' +
      centerX.toFixed() + ', ' + centerY.toFixed() + ')');
    //Show other sections after placing the robot.
    this.showOtherSections = true;
  }
  //turn the robot in any of the 4 directions.
  turnRobot() {
    let turn, robotInner, face, newFace, rotation, rotate, newRotate, split;
    this.clearMessages();
    turn = this.turn.nativeElement.value;
    robotInner = (<HTMLInputElement>document.getElementById('robot-inner'));
    if (robotInner.getAttribute('id')) {
      face = +robotInner.getAttribute('data-face');
      rotate = robotInner.getAttribute('transform');
      newFace = face + Number(turn);
      if (newFace < 0) {
        newFace = 3;
      }
      if (newFace > 3) {
        newFace = 0;
      }
      rotation = (newFace * 90).toFixed();
      // Replace rotate degrees in transform attr based on turn input
      split = rotate.split(',');
      newRotate = "rotate(" + rotation + "," + split[1] + "," + split[2]
      robotInner.setAttribute('transform', newRotate);
      robotInner.setAttribute('data-face', newFace);
    }
  }
  //Function for moving the robot forward
  moveRobot() {
    let robotOuter, robotInner, face, x, y, coordX, coordY, translate,
      translateX, translateY, newX, newY, newCoordX, newCoordY, newTranslate, splitTranslate;
    this.clearMessages();
    robotOuter = (<HTMLInputElement>document.getElementById('robot-outer'));
    if (robotOuter.getAttribute('id')) {
      robotInner = (<HTMLInputElement>document.getElementById('robot-inner'));
      face = +robotInner.getAttribute('data-face');
      x = +robotOuter.getAttribute('data-x');
      y = +robotOuter.getAttribute('data-y');
      // Extract current translate x and y from transform attribute
      translate = robotOuter.getAttribute('transform');
      splitTranslate = translate.split('(')[1].split(',');
      translateX = +splitTranslate[0];
      translateY = +splitTranslate[1].split(')')[0].trim();

      if (face === 0 && y === 4 || face === 1 && x === 4 ||
        face === 2 && y === 0 || face === 3 && x === 0) {
        this.showError = true;
        this.showErrorMessage = "Sorry i cant move that side."
        newX = translateX;
        newY = translateY;
      } else {
        this.showError = false;
        switch (face) {
          case 0:
            newX = translateX;
            newY = translateY - this.rectWidth;
            y++;
            break;

          case 1:
            newX = translateX + this.rectWidth;
            newY = translateY;
            x++;
            break;

          case 2:
            newX = translateX;
            newY = translateY + this.rectWidth;
            y--;
            break;

          case 3:
            newX = translateX - this.rectWidth;
            newY = translateY;
            x--;
            break;
          default:
            this.noSuchPath = true;
            break;
        }
      }
      newTranslate = "translate(" + newX + "," + newY + ")"
      robotOuter.setAttribute('transform', newTranslate);
      robotOuter.setAttribute('data-x', x);
      robotOuter.setAttribute('data-y', y);
    }
  }
  //Function for getting the report of robot's position.
  getReport() {
    let robotOuter, robotInner, x, y, face, direction, alert, message, newMessage;
    robotOuter = (<HTMLInputElement>document.getElementById('robot-outer'));
    this.clearMessages();
    this.showReport = true;
    if (robotOuter.getAttribute('id')) {
      x = robotOuter.getAttribute('data-x');
      y = robotOuter.getAttribute('data-y');
      robotInner = (<HTMLInputElement>document.getElementById('robot-inner'));
      face = robotInner.getAttribute('data-face');

      switch (face) {
        case '0':
          direction = 'North';
          break;
        case '1':
          direction = 'East';
          break;
        case '2':
          direction = 'South';
          break;
        case '3':
          direction = 'West';
          break;
      }
      this.showReport = true;
      this.reportMessage = "X position at " + "\"" + x + "\"" + " Y position at " + "\"" + y + "\"" + " and facing the direction " + direction;
    }
  }
}
