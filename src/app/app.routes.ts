import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'banco',
        children:[
            {
                path:'home',
                title: 'Home',
                loadComponent: ()=> import('./layouts/home/home.component')
            },
            {
                path:'login',
                title: 'Login',
                loadComponent: ()=> import('./layouts/login/login.component')
            },
            {
                path:'acces',
                title:'Control de Acceso',
                loadComponent: ()=> import('./layouts/acces-control/acces-control.component')
            },
            {
                path:'dashboard',
                title:'Dashboard',
                loadComponent: ()=> import('./layouts/dashboard/dashboard.component')
            },
            {path:'', redirectTo:'home',pathMatch:'full'},
            {path:'**', redirectTo:'home',pathMatch:'full'},
        ]
    },
    {path:'',redirectTo:'banco/home',pathMatch:'full'},
    {path:'**',redirectTo:'banco/home',pathMatch:'full'}
];
