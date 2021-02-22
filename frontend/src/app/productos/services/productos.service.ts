import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  URL_API = 'http://localhost:4000/api/products'
  public products: Product[];

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.URL_API)
  }

  addProduct(product:Product){
    return this.http.post(this.URL_API,product)
  }

  updateProduct(product:Product){
    return this.http.put(`${this.URL_API}/${product._id}`,product)
  }

  getProduct(id:string){
    return this.http.get(this.URL_API+'/'+id)
  }

}
