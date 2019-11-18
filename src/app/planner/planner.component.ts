import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

firstCardClicked:boolean = false;
secondCardClicked:boolean = false;
thirdCardClicked:boolean = false;
fourthCardClicked:boolean = false;
fifthCardClicked:boolean = false;

firstHandCardClicked:boolean = false;
secondHandCardClicked:boolean = false;

cardClicked:boolean = false;
suitClicked:boolean = false;

handStatement:String = "Three of a Kind";

  constructor() { }

  ngOnInit() {
  }

  clickFirstCard() {
  	this.cardClicked = true;
  }

  clickSecondCard() {
  	this.cardClicked = true;
  }

  clickThirdCard() {
  	this.cardClicked = true;
  }

  clickFourthCard() {
  	this.cardClicked = true;
  }

  clickFifthCard() {
  	this.cardClicked = true;
  }

  clickFirstHandCard() {
  	this.cardClicked = true;
  }

  clickSecondHandCard() {
  	this.cardClicked = true;
  }

  clickSuitSpade() {
  	this.suitClicked = true;
  }

  clickSuitClub() {
  	this.suitClicked = true;
  }

  clickSuitHeart() {
  	this.suitClicked = true;
  }

  clickSuitDiamond() {
  	this.suitClicked = true;
  }

  clickValue() {

  }

}
