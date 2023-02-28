import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-productDescription',
  templateUrl: './productDescription.component.html',
  styleUrls: ['./productDescription.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  allProducts: any = "";
  requiredProduct: any = "";
  finalProduct: any = "";

  constructor(private productData: ProductsDataService, private route: ActivatedRoute, private titleService:Title) {}

  ngOnInit() {
    this.productData.getProducts().subscribe(product => {
      this.allProducts = product;

      this.route.params.subscribe(urlData => {
        this.requiredProduct = urlData['check'];
        // console.log(this.route);
        for (let productData of this.allProducts) {
          if (productData.title == this.requiredProduct) {
            this.finalProduct = productData;
            this.titleService.setTitle(`${productData.title} | RK MART`);
            break;
          }
        }
      });
    });
  }
}
