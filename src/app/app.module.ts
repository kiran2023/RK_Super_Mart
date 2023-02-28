import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { ContactUsComponent } from '../contactUs/contactUs.component';
import { CartComponent } from '../cart/cart.component';
import { ProductDescriptionComponent } from '../productDescription/productDescription.component';
import { CategoryComponent } from '../category/category.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  declarations: [													
      AppComponent,
      HomeComponent,
      ProductsComponent,
      ContactUsComponent,
      CartComponent,
      ProductDescriptionComponent,
      ProductDescriptionComponent,
      CategoryComponent,
      FooterComponent,
      LoginComponent,
      ErrorComponent,
      ErrorComponent,
      MenuComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


