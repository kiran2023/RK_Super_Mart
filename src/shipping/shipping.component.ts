import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { product } from 'src/app/admin/product';
import { CartService } from 'src/cart.service';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  userShippingData: any = "";

  registeredUserData: any = "";
  activeUserData: any = "";
  constructor(private userData: ProductsDataService, private cartService:CartService, private title: Title, private formBuilder:FormBuilder) {
  }

  shippingForm = this.formBuilder.group(
    {
      customerName: [],
      customerMail: [],
      customerMobile: [],
      customerState: [, [Validators['required']]],
      customerCity: [, [Validators['required']]],
      customerPincode: [, [Validators['required'],Validators['minLength']]],
      customerAddress: [, [Validators['required']]]
    }
  )

  ngOnInit() {
    this.title.setTitle('Shipping | RK MART');
    this.userShippingData = this.userData.activeUser;

    this.userData.registeredUser().subscribe((data) => {
      this.registeredUserData = data;

      this.registeredUserData.filter((userData: any) => {
        if(userData.mail == sessionStorage.getItem("userMail")){
          this.activeUserData = userData;
        }
      });
    });
  }

  shippingData(){
    this.shippingForm.controls['customerName'].setValue(this.activeUserData.username),
    this.shippingForm.controls['customerMail'].setValue(this.activeUserData.mail),
    this.shippingForm.controls['customerMobile'].setValue(this.activeUserData.mobile)
    
    let uid = sessionStorage.getItem("userId");
    let totalAmount = this.cartService.getProductTotalAmount();
    let userOrderData = {
      ...this.shippingForm.value,
      totalAmount,
      uid
    }
    this.cartService.order(userOrderData).subscribe((response)=>{
      response?alert("order Placed Successfully"):alert("Error while placing order");
    })
    console.warn(userOrderData);
  }
}
