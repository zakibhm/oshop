import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/interfaces/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit {

  cart$ : Observable<ShoppingCart> | undefined ;
  constructor(private shoppigCartService : ShoppingCartService) { }

  async ngOnInit() {
     this.cart$ = await this.shoppigCartService.getCart();
  }

}
