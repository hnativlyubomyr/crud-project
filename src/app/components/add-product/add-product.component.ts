import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Subscription, Observable, of } from 'rxjs';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray, FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { IValidatorError } from "../../models/error.model";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  isAddProduct = true;

  subscription: Subscription | undefined = undefined;

  product: IProduct = { name: '', price: 0 }

  myInput: FormControl = new FormControl('', [], [myValidatorLengthAsync(2, 5)]);

  // myForm: FormGroup = new FormGroup({
  //   array: new FormArray([
  //     new FormControl('c1'),
  //     new FormControl('c2'),
  //     new FormControl('c3'),
  //   ]),
  //   name: new FormControl('m1'),
  //   price: new FormControl('m2'),
  // })

  myForm = this.formBuilder.group({
    array: this.formBuilder.array(['c1', 'c2', 'c3']),
    name: this.formBuilder.control('m1'),
    price: this.formBuilder.control('m1'),
  })

  array = (this.myForm.controls.array as FormArray).controls;

  constructor(private productsService: ProductsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.subscription = this.productsService.currentProduct$.subscribe((product: IProduct) => {
      this.isAddProduct = false;
      this.product = product;
    })

    this.myInput.statusChanges.subscribe(status => {
      console.log(status);
      console.log(this.myInput.errors);
    })

    this.myForm.valueChanges.subscribe(value => console.log(value));
    this.myForm.statusChanges.subscribe(status => {
      console.log(status);
      console.log(this.myForm.errors);
    })
  }

  addControl() {
    const control = new FormControl('');
    control.setValidators(myValidatorLength(3,5));
    //this.array.push(control);
    (this.myForm.controls.array as FormArray).push(control);
  }

  removeControl(index: number): void {
    (this.myForm.controls.array as FormArray).removeAt(index);
  }

  addProduct(product: IProduct) {
    if (this.myForm.valid)
    this.productsService.addProduct(this.myForm.value);
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

// validator
function myValidatorLength(start: number, end: number): ValidatorFn {
  return function (control: AbstractControl): { [key: string]: IValidatorError } | null
  {
    if (control.value.length <= start || control.value.length >= end) {
      return { myValidatorLength: { message: `From ${start} to ${end}` } }
    }
    return null;
  }
}

// async validator
function myValidatorLengthAsync(start: number, end: number): AsyncValidatorFn {
  return function (control: AbstractControl): Observable<{ [key: string]: IValidatorError } | null>
  {
    if (control.value.length <= start || control.value.length >= end) {
      return of({ myValidatorLength: { message: `From ${start} to ${end}` } })
    }
    return of(null);
  }
}
