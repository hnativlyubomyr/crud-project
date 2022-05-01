import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import {IProduct} from "../../models/product.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  plusCount = 0;
  minusCount = 0;
  products: IProduct[] = [];


  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.stateProducts$.subscribe((products:IProduct[]) => this.products = products);
    this.productsService.getProducts();
  }

  changeCount(data: boolean) {
    if (data) {
      this.plusCount++;
    } else {
      this.minusCount++;
    }
  }

}
