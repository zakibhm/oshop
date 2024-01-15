import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service.service';
import { Product } from '../interfaces/product';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products :Product[]= [];
  filteredProducts: Product[] = [];
  category: string | null = null;
  shoppingCart: any;
  cart$: Observable<ShoppingCart> | undefined;

  constructor(
    private route : ActivatedRoute,
    private productService: ProductService,
    private cartService:ShoppingCartService) {  

    
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    // I used switchMap to avoid nested subscribe and to avoid the problem of the asynchronous nature of the code
    this.productService.getAll().pipe(
      switchMap((products: Product[]) =>
      {
      this.products = this.filteredProducts = products;
      return this.route.queryParamMap;
      })
    )
      .subscribe((params: ParamMap) => {
      this.category =  params.get('category');
      this.applyFilter();});
  }

  private applyFilter() {
    this.filteredProducts = (this.category)? this.products.filter(p => p.category === this.category) : this.products; 
  }
}
