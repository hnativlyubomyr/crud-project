import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductsService } from "./services/products.service";
import { AddProductComponent } from './components/add-product/add-product.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MyColorDirective } from './directives/my-color.directive';
import { StrucDirDirective } from './directives/struc-dir.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    MainComponent,
    NotFoundComponent,
    HeaderComponent,
    AddProductComponent,
    ProductDetailsComponent,
    PaginationComponent,
    MyColorDirective,
    StrucDirDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
