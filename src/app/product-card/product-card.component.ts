import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input('product') p: Product = {key:'',title: '', price: 0, category: '', imageUrl: ''};
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart | undefined;

  constructor(private cartService:ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.p);

  }
}
