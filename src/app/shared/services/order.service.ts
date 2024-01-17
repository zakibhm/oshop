import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable, map } from 'rxjs';
import { Order } from 'shared/interfaces/order';
import { ShoppingCart } from 'shared/interfaces/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppigCartService: ShoppingCartService) { }


  async placeOrder(order: any) {
    let result = await  this.db.list('/orders').push(order);
    this.shoppigCartService.clearCart();
    return result;
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges() as Observable<Order[]>;
  }

  getOrdersByUserWithKeys(userId: string): Observable<Order[]> {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.val() as Order; // Assuming Order can be directly retrieved from Firebase
          const orderId = c.payload.key; // Assuming orderId is stored as the key in Firebase
          return new Order(data.userId, data.shipping,new ShoppingCart({}),orderId as string);
        })
      )
    );
  }
  

  getOrderByOrderId(orderId: string): Observable<Order> {
    return this.db.object('/orders/' + orderId).valueChanges() as Observable<Order>;
  }
}
