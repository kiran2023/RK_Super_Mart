import { Component, OnInit } from '@angular/core';
import { cart, order } from 'src/app/admin/product';
import { CartService } from 'src/cart.service';

@Component({
  selector: 'app-myOrders',
  templateUrl: './myOrders.component.html',
  styleUrls: ['./myOrders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userid = sessionStorage.getItem("userId");
  orderData:any="";
  orderTotalAmount:any;

  cartOrderList:cart[]|undefined;

  constructor(private cartService:CartService) { }

  ngOnInit() {
    // this.cartService.ordersData().subscribe((data)=>{
    //   this.orderData = data;
    // });
    this.orderData = this.cartService.getUsersCartList(this.userid);
  }
}
