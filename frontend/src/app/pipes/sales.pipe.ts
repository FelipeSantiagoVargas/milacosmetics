import { Pipe, PipeTransform } from '@angular/core';
import { Sale } from '../facturas/models/sale.model';

@Pipe({
  name: 'sales'
})
export class SalesPipe implements PipeTransform {

  transform(value: Sale[], arg: any): unknown {
    const resultSales = [];
    try {
      for (const sale of value) {
        if (sale.date.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
          resultSales.push(sale);
        }
      }
    } catch (error) {
      return value;
    }

    return resultSales;
  }

}
