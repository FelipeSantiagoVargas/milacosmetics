import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../facturas/services/facturas.service';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {

  currentDate = new Date();
  amount = undefined;

  constructor(public facturasService: FacturasService) { }

  ngOnInit(): void {
    this.amountSales()
  }

  cleanOrders() {
    this.facturasService.orders = []
  }

  saveOrders() {

  }

  amountSales() {
    this.amount = this.facturasService.getSales().subscribe(
      res => {this.amount = res; this.amount=this.amount.length+1},
      err => console.log(err)
    )
  }


}
