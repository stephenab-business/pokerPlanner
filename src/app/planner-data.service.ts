import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, HandAndTable, UpdatedHandAndTable } from './planner/planner.component';

@Injectable({
  providedIn: 'root'
})
export class PlannerDataService {

  // Card Data Information

  cardOne:Card = new Card(0,0);
  cardTwo:Card = new Card(0,0);
  cardThree:Card = new Card(0,0);
  cardFour:Card = new Card(0,0);
  cardFive:Card = new Card(0,0);
  cardSix:Card = new Card(0,0);
  cardSeven:Card = new Card(0,0);

  private deckOfCards = new HandAndTable(this.cardOne, this.cardTwo, this.cardThree, this.cardFour, this.cardFive, this.cardSix, this.cardSeven);

  private updatedDeckOfCards = new UpdatedHandAndTable(this.deckOfCards, false, false, false, false, false, false, false, "", "", "", "", "", "", "");

  private cardSource = new BehaviorSubject<UpdatedHandAndTable>(this.updatedDeckOfCards);
  currentHandAndTable = this.cardSource.asObservable();

  // Load Data Information

  private loaded = false;

  private loadedSource = new BehaviorSubject<boolean>(this.loaded);
  currentlyLoaded = this.loadedSource.asObservable();

  constructor() { }

  // Card Method

  changeUpdatedHandAndTable(updatedDeckOfCards:UpdatedHandAndTable) {
  	this.cardSource.next(updatedDeckOfCards);
  }

  // Load Method

  changeCurrentlyLoaded(value:boolean) {
    this.loadedSource.next(value);
  }
}