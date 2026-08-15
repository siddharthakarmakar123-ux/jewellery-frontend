import { RouterModule, Routes } from '@angular/router';
import { CustomerSaveSearch } from './customer-save-search/customer-save-search';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { AuthGuard } from './service/auth.guard';

export const routes: Routes = [
    {
    path: 'customer-save-search',
    component: CustomerSaveSearch,
    canActivate: [AuthGuard]
  },
  {
    path: 'app-login',
    component: LoginComponent
  },
  {
    path: 'app-signup',
    component: SignupComponent
  },
  {
    path: '',
    redirectTo: 'app-login',
    pathMatch: 'full'
  }];

  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
