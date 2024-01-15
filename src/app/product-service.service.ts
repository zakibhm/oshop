import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  getAll(): Observable<Product[]>{
    return this.db.list<Product>('/products').snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => (
          {
          key: c.payload.key,
          ...c.payload.val()
          } as Product))
      )
    );
  }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getProductByKey(key: string): Observable<any> {
    return this.db.object('/products/' + key).valueChanges();
  }

  // Update a product by its key
  updateProductByKey(key: string, updatedProduct: Partial<Product>): Promise<void> {
    return this.db.object('/products/' + key).update(updatedProduct);
  }

  // Delete a product by its key
  deleteProductByKey(key: string): Promise<void> {
    return this.db.object('/products/' + key).remove();
  }
  
}
