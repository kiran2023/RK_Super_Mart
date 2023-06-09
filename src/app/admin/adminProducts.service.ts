import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsDataService } from 'src/productsData.service';
import { product } from './product';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  categoryCount:number=0;

  adminName:any="";

  admin: boolean = false;
  editProductData:any = "";
  editProductID:any;

  getProductDataUrl = 'http://localhost:3000/Productdata';
  getCategoryUrl = 'http://localhost:3000/category';
  getCategoryTypesUrl = 'http://localhost:3000/categoryTypes';
  getRegisteredUsersUrl = 'http://localhost:3000/registeredUser';

  constructor(private http: HttpClient, private userAuth: ProductsDataService, private route: Router) {
    this.adminName = sessionStorage.getItem("adminLoggedin");
  }

  getProducts() {
    return this.http.get(`${this.getProductDataUrl}`);
  }

  getUsers() {
    return this.http.get(`${this.getRegisteredUsersUrl}`);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.getProductDataUrl}/${id}`);
  }

  addProduct(productData: product) {
    return this.http.post(`${this.getProductDataUrl}`, productData);
  }

  addCategory(categoryData: any) {
    return this.http.post(`${this.getCategoryUrl}`, categoryData);
  }

  updateCategory(categoryData: any, categoryID:any) {
    return this.http.put(`${this.getCategoryUrl}/${categoryID}`, categoryData);
  }

  getCategory() {
    return this.http.get(`${this.getCategoryUrl}`);
  }

  addCategoryTypes(category:string){
    return this.http.post(`${this.getCategoryTypesUrl}`,category); 
  }

  editProduct(productId:string|undefined|null){
    return this.http.get<product>(`${this.getProductDataUrl}/${productId}`);
  }

  updateProductData(product:product, productID:string|undefined|null){
    return this.http.put<product>(`${this.getProductDataUrl}/${productID}`, product);
  }

  removerUser(user: any) {
    return this.http.delete(`${this.getRegisteredUsersUrl}/${user}`);
  }

  logout() {
    this.admin = false;
    this.userAuth.adminLogin = false;
    sessionStorage.clear();
    this.route.navigate(['/', 'home']);
  }
}
