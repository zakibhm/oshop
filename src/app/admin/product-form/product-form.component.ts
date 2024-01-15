import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  categories$: Observable<any>;
  categories: any[] = [];
  product : Product = {
    key:'',
    title: '',
    price: 0,
    category: '',
    imageUrl: ''
  };
  id : string | null ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) 
      this.productService.getProductByKey(this.id).subscribe(p => this.product = p);
   }

  save(product: any) {
    console.log(product);
    console.log(this.id);
    if (this.id) 
      this.productService.updateProductByKey(this.id, product);
    else
      this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
