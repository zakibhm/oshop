import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/interfaces/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/interfaces/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrl: './product-quantity.component.css'
})
export class ProductQuantityComponent {
  @Input('product') product: Product = {key:'',title: '', price: 0, category: '', imageUrl: ''};
  @Input('shopping-cart') shoppingCart: ShoppingCart | undefined;

  constructor(private cartService:ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
