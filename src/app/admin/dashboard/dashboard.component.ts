import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../adminProducts.service';
import { product } from '../product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allUser: any = "";
  allProducts: product[] = [];

  constructor(private user: AdminProductsService) {
    this.user.getUsers().subscribe(user => this.allUser = user);
    this.user.getProducts().subscribe(product => this.allProducts = product as product[]);
  }

  ngOnInit() {}
}
