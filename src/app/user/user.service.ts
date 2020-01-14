import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public create(user: Partial<User>) {
    const URL = `${env.API_HOSTNAME}/users`;
    return this.http.post(URL, user);
  }
}
