import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, HandAndTable } from './planner/planner.component';

@Injectable({
  providedIn: 'root'
})
export class PlannerDataService {

  cardOne:Card = new Card(0,0);
  cardTwo:Card = new Card(0,0);
  cardThree:Card = new Card(0,0);
  cardFour:Card = new Card(0,0);
  cardFive:Card = new Card(0,0);
  cardSix:Card = new Card(0,0);
  cardSeven:Card = new Card(0,0);


  private deckOfCards = new HandAndTable(this.cardOne, this.cardTwo, this.cardThree, this.cardFour, this.cardFive, this.cardSix, this.cardSeven);

  private cardSource = new BehaviorSubject<HandAndTable>(this.deckOfCards);
  currentHandAndTable = this.cardSource.asObservable();

  constructor() { }

  changeHandAndTable(deckOfCards:HandAndTable) {
  	this.cardSource.next(deckOfCards);
  }
}