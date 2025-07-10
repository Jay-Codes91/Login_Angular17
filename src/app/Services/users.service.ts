import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _http = inject(HttpClient);
  url: string = 'https://localhost:44325/';
  controller: string = 'api/User';

  constructor() { }

  getUsers(): Observable<any>{
    return this._http.get<Iuser>(this.url + this.controller);
  }
}
