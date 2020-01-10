import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  public create(inputOrder: any) {
    const URL = `${env.API_HOSTNAME}/orders`;
    return this.http.post(URL, inputOrder);
  }

  public fetch(id: number) {
    const URL = `${env.API_HOSTNAME}/orders/${id}`;
    return this.http.get(URL);
  }

  public list() {
    const URL = `${env.API_HOSTNAME}/orders`;
    return this.http.get(URL);
  }

  public remove(id: number) {
    const URL = `${env.API_HOSTNAME}/orders/${id}`;
    return this.http.delete(URL);
  }

  public update(id: number, inputOrder: any) {
    const URL = `${env.API_HOSTNAME}/orders/${id}`;
    return this.http.put(URL, inputOrder);
  }

}
