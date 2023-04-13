import { product } from '../product'

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProductsService } from '../adminProducts.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  allProducts: product[] = [];
  categoryCount:number = 0;
  category:any = [];
  categoryListData:number =0;
  editIcon = faEdit
  deleteIcon = faTrash;

  constructor(private productData: AdminProductsService, private http: HttpClient, private route: Router) { }

  loadProductData() {
    this.productData.getProducts().subscribe(product => {
      this.allProducts = product as product[];

      this.allProducts.filter((productData) => {
        this.category.push(productData.category);
      });

      this.categoryListData = [...new Set(this.category)].length;
    })
  }

  ngOnInit(): void {
    // this.categoryCount = this.productData.categoryCount;
    this.loadProductData();
  }

  removeProduct(id: number) {
    let result = confirm("Are you sure want to remove");
    if (result) {
      this.productData.deleteProduct(id).subscribe((data) => {
        alert("Product Removed Successfully");
        this.loadProductData();
      });
    }
  }
}
