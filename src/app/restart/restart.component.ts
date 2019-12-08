import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PlannerComponent } from "../planner/planner.component";
import { PlannerDataService } from "../planner-data.service";


@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.css']
})

export class RestartComponent implements OnInit {

  modalRef: BsModalRef;

  currentlyRestarted: boolean = false;

  constructor(private modalService: BsModalService, private data: PlannerDataService) {}
  
  ngOnInit() {
    this.data.currentlyRestarted.subscribe(currentlyRestarted => this.currentlyRestarted = currentlyRestarted);
  }

  /*
   *
   * Reloading
   *
   */

   onRestart() {
     this.currentlyRestarted = true;
   }

  /*
   *
   * Modal Information
   *
   */

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.modalRef.hide();
    this.onRestart();
    console.log(this.currentlyRestarted);
  }

  decline(): void {
    this.modalRef.hide();
  }

}