import { Component, OnInit } from '@angular/core';
import { IProduct } from "../../models/product.model";
import { ProductsService } from "../../services/products.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  isAddProduct = true;

  subscription: Subscription | undefined = undefined;

  product: IProduct = { name: '', price: 0 }

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subscription = this.productsService.currentProduct$.subscribe((product: IProduct) => {
      this.isAddProduct = false;
      this.product = product;
    })
  }

  addProduct(product: IProduct) {
    this.productsService.addProduct(product);
    this.clearFields();
  }

  clearFields() {
    this.product.name = '';
    this.product.price = 0
  }

  async updateProduct(product: IProduct) {
    await this.productsService.updateProduct(product);
    this.isAddProduct = true;
    this.clearFields();
  }
}
