import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IProduct} from "../../models/product.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private productId = 0;
  public product: IProduct | null = null;
  constructor(
    private products: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      this.productId = Number(params['id']);
      this.product = this.products.productDetails(this.productId);
    })
  }
  backProducts() {
    this.router.navigate(['products']);
  }
}
