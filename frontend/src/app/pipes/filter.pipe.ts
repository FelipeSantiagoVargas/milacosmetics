import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../productos/models/productos.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Product[], arg: any): Product[] {
    const resultProducts = [];
    try {
      for (const product of value) {
        if (product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || product.reference == arg) {
          resultProducts.push(product);
        }
      }
    } catch (error) {
      return value;
    }

    return resultProducts;
  }

}
