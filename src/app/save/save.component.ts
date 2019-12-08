import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PlannerDataService } from "../planner-data.service";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseCrudService } from '../firebase-crud.service';
import { Card, HandAndTable, UpdatedHandAndTable } from '../planner/planner.component';
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

  private updatedDeckOfCards:UpdatedHandAndTable = new UpdatedHandAndTable(this.deckOfCards, false, false, false, false, false, false, false, "", "", "", "", "", "", "");

  constructor(private modalService: BsModalService, private data:PlannerDataService, private crud:FirebaseCrudService, private fb:FormBuilder, private db:AngularFireDatabase) {} 


  ngOnInit() {
    this.data.currentHandAndTable.subscribe(deckOfCards => this.updatedDeckOfCards = deckOfCards);
  }
 
  /*
   *
   *  Database Uploading
   *
   */

  inputField:string = "";

  postData(): AngularFireList<HandAndTable> {
    const defaultData = this.updatedDeckOfCards;
    this.db.list('/cardDecks').push(defaultData).key = this.inputField;
    return this.db.list('/cardDecks' + this.inputField);
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