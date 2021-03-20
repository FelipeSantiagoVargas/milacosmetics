import { Pipe, PipeTransform } from '@angular/core';
import { ProductosService } from '../productos/services/productos.service';
import { VentasComponent } from '../ventas/ventas.component';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  constructor(public ventasComponent: VentasComponent, public productosService: ProductosService) {

  }



  transform(value: string, args: unknown): unknown {
    for (let product of this.productosService.products) {
      if (product._id == value) {
        return product.name
      }
    }
  }

 


}
