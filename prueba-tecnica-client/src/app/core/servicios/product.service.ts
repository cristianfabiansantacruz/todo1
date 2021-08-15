import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../share/constants';
import { ProductController_CarroCompras, ProductController_Decrement, ProductController_Increment, ProductController_List, ProductController_Register } from './name-controllers';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    protected http: HttpClient
  ) {
  }

  registerProduct(model): Observable<any> {
    return this.http.post(
      Constants.getUrlController(ProductController_Register),
      model,
      { headers: Constants.headersJson });
  }


  getProducts(): Observable<any> {
    return this.http.get(
      Constants.getUrlController(ProductController_List),
      { headers: Constants.headersJson });
  }

  increment(model): Observable<any> {
    return this.http.post(
      Constants.getUrlController(ProductController_Increment),
      model,
      { headers: Constants.headersJson });
  }

  decrement(model): Observable<any> {
    return this.http.post(
      Constants.getUrlController(ProductController_Decrement),
      model,
      { headers: Constants.headersJson });
  }

  carrito(model): Observable<any> {
    return this.http.post(
      Constants.getUrlController(ProductController_CarroCompras),
      model,
      { headers: Constants.headersJson });
  }

}
