import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/cart/cart.component';
import { ContactUsComponent } from 'src/contactUs/contactUs.component';
import { ErrorComponent } from 'src/error/error.component';
import { HomeComponent } from 'src/home/home.component';
import { ProductDescriptionComponent } from 'src/productDescription/productDescription.component';
import { ProductsComponent } from 'src/products/products.component';
import { AuthUserGuard } from './auth-user.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'products', component:ProductsComponent}, 
  // children:[ {path:':check', component:ProductDescriptionComponent} ]},
  {path:'cart', component:CartComponent,canActivate:[AuthUserGuard]},
  {path:'contactUs', component:ContactUsComponent},
  {path:'products/:check', component:ProductDescriptionComponent},
  {path:'**', component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



