import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  rkMartProducts:any="";
  constructor(private http: HttpClient) { }
  // getProducts() {
  //   return this.http.get('http://localhost:3000/products');
  // }
  getProducts(){
    return this.http.get('http://localhost:3000/Productdata');
  }
}


