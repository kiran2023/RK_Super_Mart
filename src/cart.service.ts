import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsDataService } from './productsData.service';
import { cart, order, product } from './app/admin/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: any = [];
  productList = new BehaviorSubject<any>([]);

  userid = sessionStorage.getItem("userId");

  cartUrl = 'http://localhost:3000/cartData';
  usersCartUrl = 'http://localhost:3000/cartData?uid='
  orderUrl = 'http://localhost:3000/orders';
  ordersDataUrl = 'http://localhost:3000/orders?uid='


  constructor(private http:HttpClient, private productService:ProductsDataService) { }

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(productData: cart) {
    let result: boolean = false;
    let returnData;
    this.cartProducts.filter((product: cart): boolean =>product.productid == productData.productid && this.userid==product.uid? result = true: result);
    if(!result){
      this.cartProducts.push(productData);
      this.productList.next(this.cartProducts);
      this.getProductTotalAmount();  
      returnData = this.http.post(`${this.cartUrl}`,productData);
    }else{
      alert("Already added in the cart");
    }
    return returnData; 
  }

  getProductTotalAmount():number {
    let grandTotal = 0;
    this.cartProducts.map((product: product) => {
      grandTotal = grandTotal + parseInt(product.originalAmount,10)
    });
    return grandTotal;
  }

  getUsersCartList(userId:any){
    return this.http.get(`${this.usersCartUrl}${userId}`,{observe:'response'}).subscribe((res)=>{
      if(res && res.body){
        this.cartProducts = res.body;
        this.productList.next(this.cartProducts);
      }
    });
  }

  removeProduct(product: any,userid:any) {
    let indexData = product.id;
    this.cartProducts.map((productData: any, indexData:any, userid:any) => {
      if(product.id == productData.id) {
        this.cartProducts.splice(indexData,1);
      }
    });
    this.productList.next(this.cartProducts);
    return this.http.delete(`${this.cartUrl} ${product.id}`)
  }

  clearCart() {
    this.cartProducts = [];
    this.productList.next(this.cartProducts);
  }

  order(orderData:any){
    return this.http.post(`${this.orderUrl}`, orderData)
  }

  ordersData(){
    return this.http.get<order[]>(`${this.ordersDataUrl}${this.userid}`)
  }
}
