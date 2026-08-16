import { RouterModule, Routes } from '@angular/router';
import { CustomerSaveSearch } from './customer-save-search/customer-save-search';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { AuthGuard } from './service/auth.guard';
import { RateComponent } from './rate/rate';
import { LayoutComponent } from './layout/layout';
import { OrderDetails} from './order-details/order-details';

export const routes: Routes = [
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
    component: LayoutComponent,
    canActivate: [AuthGuard],

    children: [

      {
        path: 'customer-save-search',
        component: CustomerSaveSearch
      }, 

      {
        path: 'rates',
        component: RateComponent
      },

      {
        path: 'order-details',
        component: OrderDetails
      },

      {
        path: '',
        redirectTo: 'app-login',
        pathMatch: 'full'
      }

    ]
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
