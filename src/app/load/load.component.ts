import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})

export class LoadComponent implements OnInit {

  constructor(private modalService: BsModalService) {} 
  
  ngOnInit() {
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