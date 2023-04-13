import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product:any = [];
  subtotal:number = 0;

  productQuantityData=1;

  constructor( private cartService: CartService, private title:Title ) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe( (productData:any) => {
      this.product = productData;
      
      this.subtotal = this.cartService.getProductTotalAmount();
    });
    this.title.setTitle('Cart | RK MART')
  }

  quantityIncrementDecrement(quantityData:string){
      quantityData==='incr'?this.productQuantityData+=1:this.productQuantityData>1&&quantityData==='decr'?this.productQuantityData-=1:undefined;
  }

  removeProduct(product:any){
    this.cartService.removeProduct(product,sessionStorage.getItem('userId'));
  }

  clearCart(){
    this.cartService.clearCart();
  }

}