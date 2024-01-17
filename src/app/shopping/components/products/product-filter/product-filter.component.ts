import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'shared/interfaces/category';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  categories$ :Observable<Category[]>;
  @Input('category') category: string | null = null;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
   }
} 
