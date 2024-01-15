import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {


  cart$: Observable<ShoppingCart> | undefined;
  

  constructor (private shoppingCartService: ShoppingCartService) {
    
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
  clearCart() {
    this.shoppingCartService.clearCart();
  }


}
