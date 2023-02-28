import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsData:any;
  constructor( private data:ProductsDataService,private titleService:Title ){
    this.data.getProducts().subscribe(data => this.productsData = data );
 }


  ngOnInit() {
    this.titleService.setTitle('Products | RK MART');
  }
}


