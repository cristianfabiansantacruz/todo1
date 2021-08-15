import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './core/interceptors/login-guard.guard';
import { LoginComponent } from './core/layout/login/login.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/layout.module').then(
        m => m.LayoutModule
      )
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'todo-uno',
    loadChildren: () => import('./core/layout-secure/layout-secure.module').then(m => m.LayoutSecureModule),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
