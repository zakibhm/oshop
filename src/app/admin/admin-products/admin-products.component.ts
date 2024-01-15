import { Component } from '@angular/core';
import { ProductService } from '../../product-service.service';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {

  products$: Observable<Product[]>;
  filteredProducts: Product[] = [];
  products: Product[]= [];
  customRowsPerPage: number = 10;

  constructor (private productService : ProductService) {
    this.products$ = this.productService.getAll();
    this.productService.getAll().subscribe(products => this.products = this.filteredProducts = products);
  }

  delete(key: string | undefined) {
    if(!confirm('Are you sure you want to delete this product?') || !key) return;
    this.productService.deleteProductByKey(key);
  }

  filterProducts(query: string) {
    this.filteredProducts =(query)? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    : this.products;
  }

}
