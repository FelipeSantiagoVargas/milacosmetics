import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductosService } from '../services/productos.service';
import { Product } from '../models/productos.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  faSearch = faSearch;
  filterProducts = '';
  referenceAdd = undefined;
  referenceRemove = undefined;
  selectedProduct: Product = {
    _id: '',
    reference: undefined,
    name: '',
    price_purchase: undefined,
    price_sale: undefined,
    stock: 0,
    createdAt: '',
    updateAt: ''
  };

  constructor(public productosService: ProductosService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productosService.getProducts().subscribe(
      res => this.productosService.products = res,
      err => console.log(err)
    )
  }

  addProduct(form: NgForm) {
    Swal.fire({
      confirmButtonColor: '#78c2ad',
      cancelButtonColor: '#f2969a',
      iconColor: '#fece67',
      title: 'Estas seguro?',
      text: 'Agregar nuevo producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Agregar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Agregado!',
          text: 'Tu producto ha sido agregado con exito',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'success',
        });
        form.value.stock = '1';
        this.productosService.addProduct(form.value).subscribe(
          res => {
            this.getProducts();
            form.reset();
          },
          err => console.log(err)
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado!',
          text: 'Tu producto no fue agregado',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'error',
        });
      }
    })
  }

  selectProduct(reference: number) {
    console.log('Entro');
    console.log(reference);
    this.selectedProduct = this.productosService.products.find((product) => {
      if (product.reference == reference) {
        return product;
      }
    })
    console.log(this.selectedProduct)
  }

  updateProduct(selectedProduct: Product) {
    this.productosService.updateProduct(selectedProduct).subscribe(
      res => {
        this.getProducts();
      },
      err => console.log(err)
    );
  }

  deleteProduct(selectedProduct: Product){
    this.productosService.deleteProduct(selectedProduct).subscribe(
      res => {
        this.getProducts();
      },
      err => console.log(err)
    );
  }

  updateProductAlert(selectedProduct: Product) {
    Swal.fire({
      confirmButtonColor: '#78c2ad',
      cancelButtonColor: '#f2969a',
      iconColor: '#fece67',
      title: 'Estas seguro?',
      text: 'Actualizar producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Actualizar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Agregado!',
          text: 'Tu producto ha sido actualizado con exito',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'success',
        });
        this.updateProduct(selectedProduct);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado!',
          text: 'Tu producto no fue actualizado',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'error',
        });
      }
    })

  }

  deleteProductAlert(selectedProduct: Product) {
    Swal.fire({
      confirmButtonColor: '#78c2ad',
      cancelButtonColor: '#f2969a',
      iconColor: '#fece67',
      title: 'Estas seguro?',
      text: 'Eliminar producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Eliminado!',
          text: 'Tu producto ha sido eliminado con exito',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'success',
        });
        this.deleteProduct(selectedProduct);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado!',
          text: 'Tu producto no fue eliminado',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'error',
        });
      }
    })

  }

  addExistence(reference: number) {
    Swal.fire({
      title: 'Agregar Existencia!',
      text: 'Esta existencia sera agregada a tu stock',
      confirmButtonColor: '#78c2ad',
      cancelButtonColor: '#f2969a',
      iconColor: '#fece67',
      icon: 'warning',
      input: 'password',
    }).then((result) => {
      if (result.value == 'public234') {
        Swal.fire({
          title: 'Agregar Existencia!',
          text: 'Ingresa las unidades a agregar del producto',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'warning',
          iconColor: '#fece67',
          input: 'number'
        }).then((value) => {
          Swal.fire({
            title: 'Existencia Agregada!',
            text: 'Tu stock ha sido actualizado con exito',
            confirmButtonColor: '#78c2ad',
            cancelButtonColor: '#f2969a',
            icon: 'success',
          });
          const product = this.productosService.products.find((product) => {
            if (product.reference == reference) {
              return product;
            }
          });
          product.stock = product.stock + parseInt(value.value);
          this.updateProduct(product)
          this.referenceAdd = undefined;
        });
      } else {
        Swal.fire({
          title: 'Contraseña Incorrecta!',
          text: 'Tu existencia no fue agregada',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'error',
        });
      }

    });

  }

  removeExistence(reference: number) {
    Swal.fire({
      title: 'Eliminar Existencia!',
      text: 'Esta existencia sera eliminada de tu stock',
      confirmButtonColor: '#78c2ad',
      cancelButtonColor: '#f2969a',
      iconColor: '#fece67',
      icon: 'warning',
      input: 'password',
    }).then((result) => {
      if (result.value == 'admin234') {
        Swal.fire({
          title: 'Existencia Eliminada!',
          text: 'Tu stock ha sido actualizado con exito',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'success',
        });
        const product = this.productosService.products.find((product) => {
          if (product.reference == reference) {
            return product;
          }
        })
        product.stock = product.stock - 1;
        this.updateProduct(product)
        this.referenceRemove = undefined;
      } else {
        Swal.fire({
          title: 'Contraseña Incorrecta!',
          text: 'Tu existencia no fue eliminada',
          confirmButtonColor: '#78c2ad',
          cancelButtonColor: '#f2969a',
          icon: 'error',
        });
      }

    });


  }

}
