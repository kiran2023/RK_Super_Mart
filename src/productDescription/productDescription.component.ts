import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from 'src/app/admin/product';
import { CartService } from 'src/cart.service';
import { ProductsDataService } from 'src/productsData.service';

@Component({
  selector: 'app-productDescription',
  templateUrl: './productDescription.component.html',
  styleUrls: ['./productDescription.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  public myMath = Math;

  allProducts: any;
  requiredProduct: string | null | undefined;
  finalProduct: any;
  userLoggedin: boolean | undefined;

  categoryData: string | null = "";
  featuredProducts: any = [];

  constructor(private productDataService: ProductsDataService, private cartService: CartService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.userLoggedin = Boolean(sessionStorage.getItem("userLoggedIn"));
    this.productDataService.userLogin = this.userLoggedin;

    this.productDataService.getProducts().subscribe(product => {
      this.allProducts = product;

      this.route.paramMap.subscribe(urlData => {
        this.requiredProduct = urlData.get('productID');
        this.finalProduct = this.allProducts.find((product: { id: string | null | undefined }) => product.id == this.requiredProduct);
        let index = 0;
        for (let product of this.allProducts) {
          if (this.finalProduct.category == product.category && (this.finalProduct.id && this.requiredProduct) != product.id && index <= 3) {
            index++;
            this.featuredProducts.push(product);
          }
        }
        this.titleService.setTitle(`${this.finalProduct?.title} | RK MART`);
      });
    });
  }

  addtoCartData() {
    if (this.productDataService.userLogin) {
      let uid = sessionStorage.getItem('userId');
      let dataToCart: product = {
        ...this.finalProduct,
        uid,
      }
      this.cartService.addToCart(dataToCart).subscribe((res: any) => {
        if (res) {
          alert("done")
        } else {
          alert("error");
        }
      });
    } else {
      alert("Login to add product to Cart");
    }
  }
}