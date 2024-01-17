import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    BsNavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild([])
  ],
  exports
  :[
    BsNavbarComponent
  ]
})
export class CoreModule { }