import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/cart/cart.component';
import { ContactUsComponent } from 'src/contactUs/contactUs.component';
import { ErrorComponent } from 'src/error/error.component';
import { HomeComponent } from 'src/home/home.component';
import { MyOrdersComponent } from 'src/myOrders/myOrders.component';
import { OrderDetailsComponent } from 'src/orderDetails/orderDetails.component';
import { PaymentComponent } from 'src/payment/payment.component';
import { ProductDescriptionComponent } from 'src/productDescription/productDescription.component';
import { ProductsComponent } from 'src/products/products.component';
import { ShippingComponent } from 'src/shipping/shipping.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthUserGuard } from './auth-user.guard';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { AuthAdminGuard } from './admin/auth-admin.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products', children:[
    { path: ':category', component: ProductsComponent },
    { path: 'productDescription/:productID', component: ProductDescriptionComponent },
    { path: ':category/productDescription/:productID', component: ProductDescriptionComponent },
  ] },
  { path: 'cart', component: CartComponent, canActivate: [AuthUserGuard] },
  { path: 'contactUs', component: ContactUsComponent },
  { path:'cart', canActivateChild:[AuthUserGuard],children:[
    { path: 'shipping', component: ShippingComponent },
    { path: 'shipping/orderDetails', component: OrderDetailsComponent },
    { path: 'shipping/orderDetails/payment', component: PaymentComponent },
    { path: 'myOrders', component: MyOrdersComponent }
  ]},
  {path: 'admin', canActivate:[AuthAdminGuard], component: AdminComponent},
    
  {path:'admin', canActivate:[AuthAdminGuard],children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'manageProducts', component: ManageProductsComponent },
    { path: 'manageOrders', component: ManageOrdersComponent },
    { path: 'addProducts', component: AddProductsComponent },
    { path: 'addProducts/:id', component: AddProductsComponent }
  ]},

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



