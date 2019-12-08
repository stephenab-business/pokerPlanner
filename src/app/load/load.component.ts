import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PlannerDataService } from "../planner-data.service";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseCrudService } from '../firebase-crud.service';
import { Card, HandAndTable, UpdatedHandAndTable } from '../planner/planner.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})

export class LoadComponent implements OnInit {

  cardDecks:Observable<any>;

  cardOne:Card = new Card(0,0);
  cardTwo:Card = new Card(0,0);
  cardThree:Card = new Card(0,0);
  cardFour:Card = new Card(0,0);
  cardFive:Card = new Card(0,0);
  cardSix:Card = new Card(0,0);
  cardSeven:Card = new Card(0,0);

  nameOfSave:string = "";

  private deckOfCards:HandAndTable = new HandAndTable(this.cardOne, this.cardTwo, this.cardThree, this.cardFour, this.cardFive, this.cardSix, this.cardSeven);

  private updatedDeckOfCards:UpdatedHandAndTable = new UpdatedHandAndTable(this.nameOfSave, this.deckOfCards, false, false, false, false, false, false, false, "", "", "", "", "", "", "");

  private currentlyLoaded:boolean = false;

  constructor(private modalService: BsModalService, private data:PlannerDataService, private crud:FirebaseCrudService, private fb:FormBuilder, private db:AngularFireDatabase) {} 
  
  ngOnInit() {
    this.data.currentHandAndTable.subscribe(deckOfCards => this.updatedDeckOfCards = deckOfCards);
    this.data.currentlyLoaded.subscribe(currentlyLoaded => this.currentlyLoaded = currentlyLoaded);
    this.cardDecks = this.db.list("/cardDecks").snapshotChanges();
    this.data.currentlySaved.subscribe(nameOfSave => this.nameOfSave = nameOfSave);
  }

  /*
   *
   *  Database Uploading
   *
   */

   retrieveData() {
     let ref = this.db.list('/cardDecks');
     let data = ref.snapshotChanges().subscribe(changes => {
       return changes.map(c => {
         let deck:any = 0;
         deck = c.payload.val();
         this.data.changeUpdatedHandAndTable(deck);
         this.data.changeCurrentlyLoaded(true);
         this.modalRef.hide();
       })
     });
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