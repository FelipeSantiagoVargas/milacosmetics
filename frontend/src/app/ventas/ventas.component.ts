import { Component, OnInit } from '@angular/core';
import { faSearch,faDownload } from '@fortawesome/free-solid-svg-icons';
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

  filterSales = '';
  faSearch = faSearch;
  faDownload = faDownload;
  product;
  public sales;
  public salesDay;
  public salesMonth;
  public productosComponent: ProductsComponent;

  constructor(public facturasService: FacturasService, public productosService: ProductosService) { }

  prueba(){
    console.log('holaaaaaaa')
    this.facturasService.getAllSales().subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err),
    )
  }

  ngOnInit(): void {
    this.getSales()
    this.getSalesDay()
    this.getSalesMonth()
  }

  getSales() {
    this.facturasService.getSales().subscribe(
      res => {
        this.sales = res
        this.transformSale(this.sales)
      },
      err => console.log(err),
    )
  }

  getSalesDay() {
    this.facturasService.getSalesDay().subscribe(
      res => {
        this.salesDay = res
      },
      err => console.log(err),
    )
  }

  getSalesMonth() {
    this.facturasService.getSalesMonth().subscribe(
      res => {
        this.salesMonth = res
      },
      err => console.log(err),
    )
  }

  totalSale(sale: any) {
    let total = 0;
    for (let index = 0; index < sale.orders.length; index++) {
      total = total + sale.orders[index].price;
    }
    return total;
  }

  totalSales(sales: Sale[]){
    let total = 0;
    for (let i = 0; i < sales.length; i++) {
      total = total + this.totalSale(sales[i])
    }
    return total
  }

  transformSale(sales) {
    for (let index = 0; index < sales.length; index++) {
      const element = sales[index];
      let date = new Date(element.date)
      let def = "Fecha: "+date.getDate()+'/'+(date.getMonth()+1)+'/'+ date.getUTCFullYear()+' '+date.getHours()+':'+date.getMinutes()
      element.date = def
    }

    // console.log(this.sales)
    // for (let element in this.sales) {
    //   console.log(element[0])
    //   console.log('otro')
    // let date = element.date;
    // date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    // element.date = date
    // console.log(element.date)

  }

}
