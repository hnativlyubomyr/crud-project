import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./components/main/main.component";
import { ProductsComponent } from "./components/products/products.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'products', children: [
      { path: '', component: ProductsComponent },
      { path: ':id', component: ProductDetailsComponent },
    ] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
