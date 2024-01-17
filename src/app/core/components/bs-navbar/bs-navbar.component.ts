import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/interfaces/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/interfaces/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css'
})
export class BsNavbarComponent implements OnInit {

  //we're using the subscribe method instead of the async pipe because we need to aavoid infinite loops caused by the async pipe because of change detection
  appUser: AppUser | null = null;
  cart$: Observable<ShoppingCart> | undefined;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService)
    {
  } 

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
