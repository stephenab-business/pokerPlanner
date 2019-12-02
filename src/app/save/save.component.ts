import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})

export class SaveComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {} 
  
  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

}