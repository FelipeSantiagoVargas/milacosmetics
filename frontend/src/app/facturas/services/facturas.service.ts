import { Injectable } from '@angular/core';
import {Order} from '../models/orders.model';
import {HttpClient} from '@angular/common/http';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  public orders : Order[] = [];
  public total: number = 0;
  public pago: number;
  public items;
  public amount;
  formatPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  URL_API_ORDERS = 'http://localhost:4000/api/orders'
  URL_API_SALES = 'http://localhost:4000/api/sales'

  constructor(private http: HttpClient) { }


  addSale(){
    const sale:Sale = {
      orders: this.items,
      date: new Date()
    }
    return this.http.post(this.URL_API_SALES,sale)
  }

  addOrders(){
    return this.http.post(this.URL_API_ORDERS,this.orders)
  }

  getSales(){
    return this.http.get(this.URL_API_SALES)
  }

  formatCurrency(value){
    return this.formatPeso.format(value);
  }
}
