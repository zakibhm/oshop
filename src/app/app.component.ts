import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private auth: AuthService,router: Router, userService : UserService ) {
    auth.user$.subscribe(user => {
      if(!user) return;

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');

      //for only one time use
      if(returnUrl) 
      {  localStorage.removeItem('returnUrl');
         router.navigateByUrl(returnUrl as string);}
    })
   }
  
}
