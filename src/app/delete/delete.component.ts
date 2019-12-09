import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Card, HandAndTable, UpdatedHandAndTable } from '../planner/planner.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {

  cardDecks:Observable<any>;

  constructor(private modalService: BsModalService, private db: AngularFireDatabase) {

  } 
  
  ngOnInit() {
    this.cardDecks = this.db.list("/cardDecks").snapshotChanges();
  }

  /*
   *
   * Delete
   * 
   */

   // delete() {
   //   this.db.list("/cardDecks").remove();
   // }

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