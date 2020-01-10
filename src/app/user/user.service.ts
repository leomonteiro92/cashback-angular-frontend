import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public create(user: any) {
    const URL = `${env.API_HOSTNAME}/users`;
    return this.http.post(URL, user);
  }
}
