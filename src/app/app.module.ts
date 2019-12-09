import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlannerComponent } from './planner/planner.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { LoadComponent } from './load/load.component';
import { SaveComponent } from './save/save.component';
import { DeleteComponent } from './delete/delete.component';
import { RestartComponent } from './restart/restart.component';

@NgModule({
  declarations: [
    AppComponent,
    PlannerComponent,
    LoadComponent,
    SaveComponent,
    DeleteComponent,
    RestartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCZtSAE1gv_wbkj9apu09512s9kiykEvTw",
      authDomain: "poker-planner-5428a.firebaseapp.com",
      databaseURL: "https://poker-planner-5428a.firebaseio.com",
      projectId: "poker-planner-5428a",
      storageBucket: "poker-planner-5428a.appspot.com",
      messagingSenderId: "809907076890",
      appId: "1:809907076890:web:abf14024e8d01e5c2ef6a3"
    }),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
