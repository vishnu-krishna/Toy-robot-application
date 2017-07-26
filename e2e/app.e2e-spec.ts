import { RobotPage } from './app.po';
import { element, by, browser } from 'protractor';

describe('Toy Robot Application', function () {
  let page: RobotPage;

  beforeEach(() => {
    page = new RobotPage();
  });

  it("Create the robot and place at 0,0", () => {
    browser.get("/");
    let xValue = element(
      by.css("#x"));
    xValue.sendKeys("0");
    let yValue = element(
      by.css("#y"));
    yValue.sendKeys("0");

    let face = element(
      by.css("#face"));
    let place = element(
      by.css("#btn-place"));
    place.click();
    let robot = element.all(by.css("#robot-outer"));
    expect(robot).toBeTruthy();
  });

  it("turn the robot in north direction", () => {
    let xValue, yValue, face, place, robotOuter, robotInner, turnButton, newTransform, turnValue;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("0");
    face = element(by.css("#face"));
    face.sendKeys("0");
    place = element(by.css("#btn-place"));
    place.click();
    robotOuter = element.all(by.css("#robot-outer"));
    robotInner = element.all(by.css("#robot-inner"));
    turnValue = element(by.css("#turn"));
    turnValue.sendKeys("1");
    turnButton = element(by.css("#btn-turn"));
    turnButton.click();
    newTransform = robotInner.getAttribute('transform');
    expect(newTransform).toEqual(['rotate(90, 40, 360)']);
  });

  it("turn the robot in east direction", () => {
    let xValue, yValue, face, place, robotOuter, robotInner, turnButton, newTransform, turnValue;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("0");
    face = element(by.css("#face"));
    face.sendKeys("East");
    place = element(by.css("#btn-place"));
    place.click();
    robotInner = element.all(by.css("#robot-inner"));
    turnValue = element(by.css("#turn"));
    turnValue.sendKeys("Right");
    turnButton = element(by.css("#btn-turn"));
    turnButton.click();
    newTransform = robotInner.getAttribute('transform');
    expect(newTransform).toEqual(['rotate(180, 40, 360)']);
  });

  it("turn the robot in south direction", () => {
    let xValue, yValue, face, place, robotOuter, robotInner, turnButton, newTransform, turnValue;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("0");
    face = element(by.css("#face"));
    face.sendKeys("South");
    place = element(by.css("#btn-place"));
    place.click();
    robotInner = element.all(by.css("#robot-inner"));
    turnValue = element(by.css("#turn"));
    turnValue.sendKeys("Right");
    turnButton = element(by.css("#btn-turn"));
    turnButton.click();
    newTransform = robotInner.getAttribute('transform');
    expect(newTransform).toEqual(['rotate(270, 40, 360)']);
  });

  it("turn the robot in west direction", () => {
    let xValue, yValue, face, place, robotOuter, robotInner, turnButton, newTransform, turnValue;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("0");
    face = element(by.css("#face"));
    face.sendKeys("West");
    place = element(by.css("#btn-place"));
    place.click();
    robotInner = element.all(by.css("#robot-inner"));
    turnValue = element(by.css("#turn"));
    turnValue.sendKeys("Right");
    turnButton = element(by.css("#btn-turn"));
    turnButton.click();
    newTransform = robotInner.getAttribute('transform');
    expect(newTransform).toEqual(['rotate(0, 40, 360)']);
  });

  it("should move the robot to co-ordinates x=0 and y=1", () => {
    let xValue, yValue, face, place, getReport, robotOuter, moveButton, newTransform, dataX, dataY, coordX, coordY;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("0");
    face = element(by.css("#face"));
    face.sendKeys("North");
    place = element(by.css("#btn-place"));
    place.click();
    moveButton = element(by.css("#btn-move"));
    moveButton.click();
    robotOuter = element.all(by.css("#robot-outer"));
    newTransform = robotOuter.getAttribute('transform');
    dataX = robotOuter.getAttribute('data-x');
    dataY = robotOuter.getAttribute('data-y');
    expect(newTransform).toEqual(["translate(0,-80)"]);
    expect(dataX).toEqual(['0']);
    expect(dataY).toEqual(['1']);


  });

  it("should move the robot to co-ordinates x=0 and y=2", () => {
    let xValue, yValue, face, place, getReport, robotOuter, moveButton, newTransform, dataX, dataY, coordX, coordY;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("1");
    face = element(by.css("#face"));
    face.sendKeys("North");
    place = element(by.css("#btn-place"));
    place.click();
    moveButton = element(by.css("#btn-move"));
    moveButton.click();
    robotOuter = element.all(by.css("#robot-outer"));
    newTransform = robotOuter.getAttribute('transform');
    dataX = robotOuter.getAttribute('data-x');
    dataY = robotOuter.getAttribute('data-y');
    expect(newTransform).toEqual(["translate(0,-80)"]);
    expect(dataX).toEqual(['0']);
    expect(dataY).toEqual(['2']);


  });

  it("should not move the robot when x=anyValue, y=4, direction=North and report alert message", () => {
    let xValue, yValue, face, place, getReport, robotOuter, moveButton, error;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("4");
    face = element(by.css("#face"));
    face.sendKeys("North");
    place = element(by.css("#btn-place"));
    place.click();
    moveButton = element(by.css("#btn-move"));
    moveButton.click();
    error = element(by.css("#error"));
    expect(error.getText()).toEqual("Sorry i cant move that side.")
  });

  it("should not move the robot when x=4,y=anyValue,direction=East and report alert message", () => {
    let xValue, yValue, face, place, getReport, robotOuter, moveButton, error;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("4");
    yValue = element(by.css("#y"));
    yValue.sendKeys("4");
    face = element(by.css("#face"));
    face.sendKeys("East");
    place = element(by.css("#btn-place"));
    place.click();
    moveButton = element(by.css("#btn-move"));
    moveButton.click();
    error = element(by.css("#error"));
    expect(error.getText()).toEqual("Sorry i cant move that side.")
  });
  
  it("should not move the robot when x=anyValue, y=0 ,direction=South and report alert message", () => {
    let xValue, yValue, face, place, getReport, robotOuter, moveButton, error;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("4");
    yValue = element(by.css("#y"));
    yValue.sendKeys("0");
    face = element(by.css("#face"));
    face.sendKeys("South");
    place = element(by.css("#btn-place"));
    place.click();
    moveButton = element(by.css("#btn-move"));
    moveButton.click();
    error = element(by.css("#error"));
    expect(error.getText()).toEqual("Sorry i cant move that side.")
  });

  it("should not move the robot when x=0,y=anyValue,direction=West and report alert message", () => {
    let xValue, yValue, face, place, getReport, robotOuter, moveButton, error;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("0");
    face = element(by.css("#face"));
    face.sendKeys("West");
    place = element(by.css("#btn-place"));
    place.click();
    moveButton = element(by.css("#btn-move"));
    moveButton.click();
    error = element(by.css("#error"));
    expect(error.getText()).toEqual("Sorry i cant move that side.")
  });

  it("should report the robot's co-ordinate and direction as west", () => {
    let xValue, yValue, face, place, getReport, robotOuter, reportButton, report;
    browser.get("/");
    xValue = element(by.css("#x"));
    xValue.sendKeys("0");
    yValue = element(by.css("#y"));
    yValue.sendKeys("0");
    face = element(by.css("#face"));
    face.sendKeys("West");
    place = element(by.css("#btn-place"));
    place.click();
    reportButton = element(by.css("#btn-report"));
    reportButton.click();
    report = element(by.css("#report"));
    expect(report.getText()).toEqual("X position at " + "\"" + "0"+ "\" " + "Y position at " + "\"" + "0" + "\" " + "and facing the direction West")
  });

});
