import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PlannerDataService } from "../planner-data.service";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseCrudService } from '../firebase-crud.service';
import { Card, HandAndTable } from '../planner/planner.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})

export class SaveComponent implements OnInit {

  cardOne:Card = new Card(0,0);
  cardTwo:Card = new Card(0,0);
  cardThree:Card = new Card(0,0);
  cardFour:Card = new Card(0,0);
  cardFive:Card = new Card(0,0);
  cardSix:Card = new Card(0,0);
  cardSeven:Card = new Card(0,0);

  private deckOfCards:HandAndTable = new HandAndTable(this.cardOne, this.cardTwo, this.cardThree, this.cardFour, this.cardFive, this.cardSix, this.cardSeven);


  constructor(private modalService: BsModalService, private data:PlannerDataService, private crud:FirebaseCrudService, private fb:FormBuilder, private db:AngularFireDatabase) {} 


  ngOnInit() {
    this.data.currentHandAndTable.subscribe(deckOfCards => this.deckOfCards = deckOfCards);
  }
 
  /*
   *
   *  Database Uploading
   *
   */

  card:any;
  cardForm:FormGroup;

  buildForm() {
    this.cardForm = this.fb.group({
      suit:[],
      value:[],
      index:[],
      highlight:[],
      url:[]
    });

    this.card.subscribe(card => {
      this.cardForm.patchValue(card);
    })
  }

  startNewCard() {
    this.card = this.crud.createCard();
    this.buildForm();
  }

  saveCardChanges() {
    const data = this.cardForm.value;
    this.crud.updateCard(this.card, data);
  }

  deck:any;
  deckForm:FormGroup;

  buildFormTwo() {
    this.deckForm = this.fb.group({
      card1:[''],
      card2:[''],
      card3:[''],
      card4:[''],
      card5:[''],
      card6:[''],
      card7:['']
    });

    this.deck.subscribe(deck => {
      this.deckForm.patchValue(deck);
    })
  }

  startNewDeck() {
    this.deck = this.crud.createDeck();
    this.buildFormTwo();
  }

  saveDeckChanges() {
    const data = this.deckForm.value;
    this.crud.updateCard(this.deck, data);
  }

  postData(): AngularFireList<HandAndTable>{
    const defaultData = this.deckOfCards;
    const dataKey = this.db.list('/cardDecks').push(defaultData).key;
    return this.db.list('/cardDecks' + dataKey);
  }



  /*
   *
   *  Modal Code
   *
   */

  modalRef: BsModalRef;

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

}