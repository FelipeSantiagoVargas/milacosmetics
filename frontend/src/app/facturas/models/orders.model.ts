import { from } from "rxjs";
import { ProductsComponent } from "src/app/productos/components/products.component";
import {Product} from '../../productos/models/productos.model';

export interface Order{
    product: Product,
    price: number,
    amount: number,
}