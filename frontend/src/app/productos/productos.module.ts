import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from './services/productos.service';
import { ProductsComponent } from './components/products.component'

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule
  ],
  providers: [
    ProductosService
  ],
  bootstrap: [ProductsComponent]
})

export class ProductosModule { }
