import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Order } from 'shared/interfaces/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  orders$ : Observable<Order[]>;
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {

    this.orders$ = authService.user$.pipe(
      switchMap((user:any) => {
        if (user)
          return this.orderService.getOrdersByUserWithKeys(user.uid);
        else
          return of([]);
      })
    );
   }

   navigateToOrderDetails(orderId: string | null | undefined) {
    if (orderId)
      this.router.navigate(['my/orders/order-details'], { queryParams: { orderId: orderId } });
   }



}
