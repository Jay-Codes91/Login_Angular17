import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  private _serLogin = inject(LoginService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  form!: FormGroup;
  
  constructor(){
    this.form = this._fb.group({
      correo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.email
        ]),
      ],

      pass: ['', Validators.compose([Validators.required])],
    })

    const token = localStorage.getItem('token');

    if(token){
      this._router.navigate(['/usuarios']);
    }
    
  }

  ngOnInit(): void {
    
  }

  login(){

    const user = {
      correo: this.form.get('correo')?.value,
      pass: this.form.get('pass')?.value
    }

    this._serLogin.login(user).subscribe({
      next: data => {
          
        this._router.navigate(['/usuarios'])
      },

      error: (err: HttpErrorResponse) => {
        alert('Usuario o contraseña incorrecta');
      }
    })

  }

}
