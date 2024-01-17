import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';

import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';


@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  imports: [
    TableModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'admin/products/new', 
        component:ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/products/:id', 
        component:ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/products', 
        component:AdminProductsComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/orders', 
        component:AdminOrdersComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      }
      
    ])
  ],
  providers : [
    AdminAuthGuard  
  ]
})
export class AdminModule { }
