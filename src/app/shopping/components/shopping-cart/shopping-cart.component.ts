import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/interfaces/shopping-cart';
import { Product } from 'shared/interfaces/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }
  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product);
  }


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
