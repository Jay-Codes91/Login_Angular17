import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILogin } from '../Models/Login';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _http = inject(HttpClient);
  url: string = 'https://localhost:44325/';
  controller: string = 'api/Login';
  controller2: string = 'api/Claims';

  public userSubject: BehaviorSubject<any>;

  get GetToken() {
    return this.userSubject.value;
  }

  constructor() {
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
  }

  login(log: ILogin): Observable<any> {
    return this._http.post<any>(this.url + this.controller, log).pipe(
      map((res) => {
        const token = res.token;
        console.log(res.token);

        localStorage.setItem('token', token);
        this.userSubject.next(token);
        return true;
      })
    );
  }

  getClaims(): Observable<any>{
    return this._http.get(this.url + this.controller2);
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
   
  }
}
