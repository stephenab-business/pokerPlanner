import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {

  nameOfSave = 'name of save';
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