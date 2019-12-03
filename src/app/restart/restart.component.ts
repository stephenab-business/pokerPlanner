import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PlannerComponent } from "../planner/planner.component";

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.css']
})

export class RestartComponent implements OnInit {

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