import { Routes } from '@angular/router';
import { Guard } from './Security/guardian.guard';

export const routes: Routes = [
    {
        path: 'usuarios',
        loadComponent: () => import('./Components/usuarios/usuarios.component').then(c => c.UsuariosComponent),
        canActivate: [Guard]
    },

    {
        path: 'login',
        loadComponent: () => import('./Components/login/login.component').then(c => c.LoginComponent)
    },

    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
