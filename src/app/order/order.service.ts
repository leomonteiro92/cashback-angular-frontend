import { environment as env } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  public create(inputOrder: Partial<Order>) {
    const URL = `${env.API_HOSTNAME}/orders`;
    return this.http.post(URL, inputOrder);
  }

  public fetch(id: string) {
    const URL = `${env.API_HOSTNAME}/orders/${id}`;
    return this.http.get(URL);
  }

  public list(options?: any) {
    const URL = `${env.API_HOSTNAME}/orders`;
    const params = new HttpParams({
      fromObject: options
    });
    return this.http.get(URL, { params });
  }

  public remove(id: string) {
    const URL = `${env.API_HOSTNAME}/orders/${id}`;
    return this.http.delete(URL);
  }

  public update(id: string, inputOrder: Partial<Order>) {
    const URL = `${env.API_HOSTNAME}/orders/${id}`;
    return this.http.put(URL, inputOrder);
  }

  public balance() {
    const URL = `${env.API_HOSTNAME}/balance`;
    return this.http.get(URL);
  }

}
