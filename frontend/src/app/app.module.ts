import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsComponent } from './productos/components/products.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { FacturasComponent } from './facturas/facturas.component';
import { ImprimirComponent } from './imprimir/imprimir.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductPipe } from './pipes/product.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    FilterPipe,
    FacturasComponent,
    ImprimirComponent,
    VentasComponent,
    ProductPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
    {path: 'home', component: HomeComponent},
    {path: 'productos', component: ProductsComponent},
    {path: 'facturas', component: FacturasComponent},
    {path: 'imprimir', component: ImprimirComponent},
    {path: 'ventas', component: VentasComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
  ]),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
