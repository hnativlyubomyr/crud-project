import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from "../../models/product.model";
import { ProductsService } from "../../services/products.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product!: IProduct;
  @Output() changeCount = new EventEmitter<boolean>();

  constructor(private productsService: ProductsService, private router: Router) { }

  handlePlusButton() {
    this.changeCount.emit(true);
  }

  handleMinusButton() {
    this.changeCount.emit(false);
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id);
  }

  updateProduct(product: IProduct): void {
    this.productsService.setCurrentProduct({ ...product });
  }

  productDetails(): void {
    this.router.navigate(['products', `${this.product.id}`])
  }

}
