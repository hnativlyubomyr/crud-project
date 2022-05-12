import { Injectable } from '@angular/core';
import { IProduct } from "../models/product.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProductsService {
  private stateProducts = new Subject<IProduct[]>();
  private currentProduct = new Subject<IProduct>();

  private products: IProduct[] = [];

  stateProducts$ = this.stateProducts.asObservable();
  currentProduct$ = this.currentProduct.asObservable();

  constructor(private http: HttpClient) {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<IProduct[]>('/fetchProducts')
      .subscribe((data: IProduct[]) => {
            console.log(data);
            this.products = data;
            this.getProducts();
          });

  }

  getProducts() {
    this.stateProducts.next(this.products);
  }

  addProduct(product: IProduct) {
    this.http.post<IProduct>('/addProduct', product).subscribe((product: IProduct) => {
      this.products.push(product);
      this.getProducts();
    })
  }

  deleteProduct(id: number) {
    this.http.delete<{ id: number }>(`/deleteProduct/${id}`).subscribe((id: { id: number }) => {
      this.products = this.products.filter((item) => item.id !== id.id);
      this.getProducts();
    })

  }

  setCurrentProduct(product: IProduct) {
    this.currentProduct.next(product);
  }

  productDetails(id: number): IProduct | null {
    const product = this.products.find((item:IProduct) => item.id === id);

    return product || null;
  }

  updateProduct(product: IProduct) {
    debugger;
    const { id } = product;
    const body = { ...product };
    delete body.id;

    this.http.put<IProduct>(`/updateProduct/${id}`, body).subscribe((data: IProduct) => {
      debugger;
      const index = this.products.findIndex(item => item.id === data!.id);
      this.products.splice(index, 1, data);
      this.getProducts();
    });

  }
}
