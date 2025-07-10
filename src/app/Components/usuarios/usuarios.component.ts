import { Component, Inject, inject, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { Iuser } from '../../Models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  users: Iuser[] = [];
  claims: Iuser[] = [];
  rolUser: string = ''
  private _serUser = inject(UsersService);
  private _serLogin = inject(LoginService);
  private _router = inject(Router);
  
  constructor(){
    this._serLogin.getClaims().subscribe({
      next: data => {
        this.claims = Object.values(data);
        for (let index = 0; index < this.claims.length; index++) {
          const element = this.claims[index].rol;
          this.rolUser = element;
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log("No se puede acceder a los claims");
        
      }
    })
  }
  ngOnInit(): void {
    this.getUsuario();
    //this.getClaimsUser();
  }

  getUsuario(){
    this._serUser.getUsers().subscribe({
      next: data => {
        this.users = data;
        console.log(data);
        
      },

      error: (err: HttpErrorResponse) => {
        console.log(err.message);
        
      }
    })
  }
/*
  getClaimsUser(){
    this._serLogin.getClaims().subscribe({
      next: data => {
        this.claims = Object.values(data);
      },

      error: (err: HttpErrorResponse) => {
        console.log("No se puede acceder a los claims");
        
      }
    })
  }
*/
  logOut(){
    this._serLogin.logOut();
    this._router.navigate(['/login'])
  }
}
