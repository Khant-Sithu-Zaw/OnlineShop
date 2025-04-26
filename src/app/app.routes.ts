import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { OrderHistoryComponent } from './order-history/order-history.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'search/:searchTerm', component: HomeComponent },
    { path: 'search', component: HomeComponent },
    { path: 'tag/:tag', component: HomeComponent },
    { path: 'food/:id', component: FoodDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
    { path: 'orderHistory', component: OrderHistoryComponent, canActivate: [AuthGuard] },
    //:tag is name of the parameter used for retrieving the tag value
];

@NgModule({
    imports: [RouterModule.forRoot(routes),], // Register routes
    exports: [RouterModule] // Export RouterModule for use in other modules
})
export class AppRoutingModule {


}


