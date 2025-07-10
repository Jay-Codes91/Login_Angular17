import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../Services/login.service';
import { inject } from '@angular/core';


export class jwtInterceptor implements HttpInterceptor{
  
  private _serLogin = inject(LoginService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const token = localStorage.getItem('token');
    const token = this._serLogin.GetToken;
    console.log("El token es: " + token);
    
    
    if(token){
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next.handle(request);
}
}
