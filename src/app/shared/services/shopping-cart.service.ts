import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { Product } from 'shared/interfaces/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/interfaces/shopping-cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
    .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key as string);
  
    item$.pipe(take(1)).subscribe((item: { quantity: number } | null) => {
      this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).update({ product: product, quantity: (item?.quantity || 0) + 1});
   });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key as string);
    item$.pipe(take(1)).subscribe((item: { quantity: number } | null) => {
      if (item?.quantity === 1) this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).remove();
      else this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).update({ product: product, quantity: (item?.quantity || 0) - 1});
    });
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  // async getCart(): Promise<Observable<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/' + cartId).valueChanges() as Observable<ShoppingCart>;
  // }

  private getItem(cartId: string, productId: string) {
    return this.db.object<{ quantity: number } | null>('/shopping-carts/' + cartId + '/items/' + productId).valueChanges();
  }


  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;
    // create a cart
    let result = await this.create();
    localStorage.setItem('cartId', result.key as string);
    return result.key as string;
    
  }

}
