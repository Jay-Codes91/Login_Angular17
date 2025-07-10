import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { Injectable, inject } from '@angular/core';

@Injectable(
  { providedIn: 'root' }
)

class guardianGuard{

  private _serLogin = inject(LoginService);
  private _router = inject(Router);
  
   Access(route: ActivatedRouteSnapshot){
    const user = this._serLogin.GetToken;

    if(user){
      return true;
    }
    this._router.navigate(['/login']);
    return false;
   }
   
}

export const Guard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(guardianGuard).Access(route);
};

