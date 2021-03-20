import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductosService } from '../productos/services/productos.service';
import { FacturasService } from '../facturas/services/facturas.service'
import { Product } from '../productos/models/productos.model';
import { Order } from './models/orders.model';
import Swal from 'sweetalert2';
import { faJediOrder } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  faSearch = faSearch;
  filterProducts = '';
  referenceAdd: number = undefined;

  constructor(public productosService: ProductosService, public facturasService: FacturasService) { }

  ngOnInit(): void {
    this.getProducts();
    this.facturasService.orders = []
    this.facturasService.total = 0
    this.facturasService.pago = undefined
  }

  addSale() {
    const rev = this.facturasService.addSale()
    rev.subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  addOrders() {
    const rev = this.facturasService.addOrders()
    rev.subscribe(
      res => {
        this.facturasService.items = res['orders']
        this.addSale()
      }),
      err => console.log(err)
    this.total()
  }

  getProducts() {
    this.productosService.getProducts().subscribe(
      res => this.productosService.products = res,
      err => console.log(err)
    )
  }

  addtoBuy(referenceProduct: number) {
    const product = this.productosService.products.find((value) => {
      if (value.reference == referenceProduct) {
        if (value.stock == 0) {
          Swal.fire({
            title: 'Stock Insuficiente!',
            text: 'No quedan unidades para la venta',
            confirmButtonColor: '#78c2ad',
            cancelButtonColor: '#f2969a',
            icon: 'error',
          });
          return false;
        }
        console.log(value);
        value.stock = value.stock - 1;
        console.log(value);
        this.productosService.updateProduct(value).subscribe(
          res=> this.getProducts(),
          err => console.log(err)
        );
        return value;
      }
    });

    if (product) {
      const ready = this.facturasService.orders.find((value) => {
        if (product.reference == value.product.reference) {
          value.amount = value.amount + 1;
          value.price = value.amount * value.product.price_sale;
          this.referenceAdd = undefined;
          return true;
        }
      })

      if (!ready) {
        const order = {
          product: product,
          amount: 1,
          price: product.price_sale
        }
        order.price = order.amount * order.price;
        this.facturasService.orders.push(order);
      }

      this.updateTotal(this.facturasService.orders);
      this.referenceAdd = undefined;
    }
  }

  deletetoBuy(order: Order) {
    order.product.stock = order.product.stock + order.amount;
    this.facturasService.orders.splice(this.facturasService.orders.indexOf(order), 1);
    this.productosService.updateProduct(order.product);
    this.updateTotal(this.facturasService.orders);
  }


  updateTotal(orders: Order[]) {
    this.facturasService.total = 0;
    orders.forEach((e) => {
      this.facturasService.total += e.price;
    });

  }

  total() {
    if (this.facturasService.pago == undefined) {
      this.facturasService.pago = this.facturasService.total;
    }
  }

}
