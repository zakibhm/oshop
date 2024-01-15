import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Shipping } from '../interfaces/shipping';
import { AuthService } from '../auth.service';
import { Order } from '../interfaces/order';
import { ShoppingCart } from '../interfaces/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css'
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };

  @Input('cart') cart: ShoppingCart | undefined;
  subscription: Subscription | undefined;
  userId: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => {
      if (user)
        this.userId =  user.uid;});
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart as ShoppingCart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
