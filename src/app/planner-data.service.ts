import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, HandAndTable, UpdatedHandAndTable } from './planner/planner.component';

@Injectable({
  providedIn: 'root'
})
export class PlannerDataService {

  constructor() { }

  // Save Information

  private nameOfSave:any = "";

  private nameOfSaveSource = new BehaviorSubject<any>(this.nameOfSave);
  currentlySaved = this.nameOfSaveSource.asObservable();

  // Save Method 

  changeCurrentlySaved(name:any) {
    this.nameOfSaveSource.next(name);
  }

  // Card Data Information

  cardOne:Card = new Card(0,0);
  cardTwo:Card = new Card(0,0);
  cardThree:Card = new Card(0,0);
  cardFour:Card = new Card(0,0);
  cardFive:Card = new Card(0,0);
  cardSix:Card = new Card(0,0);
  cardSeven:Card = new Card(0,0);

  private deckOfCards = new HandAndTable(this.cardOne, this.cardTwo, this.cardThree, this.cardFour, this.cardFive, this.cardSix, this.cardSeven);

  private updatedDeckOfCards = new UpdatedHandAndTable(this.nameOfSave, this.deckOfCards, false, false, false, false, false, false, false, "", "", "", "", "", "", "");

  private cardSource = new BehaviorSubject<UpdatedHandAndTable>(this.updatedDeckOfCards);
  currentHandAndTable = this.cardSource.asObservable();

  // Card Method

  changeUpdatedHandAndTable(updatedDeckOfCards:UpdatedHandAndTable) {
    this.cardSource.next(updatedDeckOfCards);
  }

  // Load Data Information

  private loaded = false;

  private loadedSource = new BehaviorSubject<boolean>(this.loaded);
  currentlyLoaded = this.loadedSource.asObservable();

  // Load Method

  changeCurrentlyLoaded(value:boolean) {
    this.loadedSource.next(value);
  }

  // Restart Information

  private restarted = false;

  private restartSource = new BehaviorSubject<boolean>(this.restarted);
  currentlyRestarted = this.restartSource.asObservable();

  changeCurrentlyRestarted(value:boolean) {
    this.restartSource.next(value);
  }
}