import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  nameOfSave:String = "saveNumberOne";

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
