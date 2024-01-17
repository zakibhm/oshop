import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'shared/interfaces/order';
import { ShoppingCart } from 'shared/interfaces/shopping-cart';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrl: './shopping-cart-summary.component.css'
})
export class ShoppingCartSummaryComponent {

  @Input('cart') cart: ShoppingCart | undefined;
  order$ : Observable<Order> | undefined;
  orderId: string | null = null;
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) 
  { 
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
    });
    this.order$ = orderService.getOrderByOrderId(this.orderId as string);
    this.order$.subscribe(order => {this.order = order
      console.log(this.order);});
    console.log(this.orderId);
   }

}
