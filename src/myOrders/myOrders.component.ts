import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/admin/product';
import { CartService } from 'src/cart.service';

@Component({
  selector: 'app-myOrders',
  templateUrl: './myOrders.component.html',
  styleUrls: ['./myOrders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData:any='';
  orderTotalAmount:any
  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cartService.ordersData().subscribe((data)=>{
      this.orderData = data;
    });
    this.orderTotalAmount = this.cartService.getProductTotalAmount();
    console.warn(this.orderTotalAmount);
  }
}
