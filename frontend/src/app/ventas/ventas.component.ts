import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Order } from '../facturas/models/orders.model';
import { Sale } from '../facturas/models/sale.model';
import { FacturasService } from '../facturas/services/facturas.service';
import { ProductsComponent } from '../productos/components/products.component';
import { ProductosService } from '../productos/services/productos.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  faSearch = faSearch;
  product;
  public sales;
  public productosComponent: ProductsComponent;

  constructor(public facturasService: FacturasService, public productosService: ProductosService) { }

  ngOnInit(): void {
    this.getSales()
  }

  getSales() {
    this.facturasService.getSales().subscribe(
      res => {
        this.sales = res
      },
      err => console.log(err),
    )
  }

  totalSale(sale:any){
    let total = 0;
    console.log(sale.orders.length);
    for (let index = 0; index < sale.orders.length; index++) {
       total = total+sale.orders[index].price;
    }
    return total;
  }

}
