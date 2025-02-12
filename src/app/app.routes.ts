import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'search/:searchTerm', component: HomeComponent },
    { path: 'search', component: HomeComponent },
    { path: 'tag/:tag', component: HomeComponent },
    { path: 'food/:id', component: FoodDetailComponent },
    { path: 'cart', component: CartComponent },
    //:tag is name of the parameter used for retrieving the tag value
];

@NgModule({
    imports: [RouterModule.forRoot(routes),], // Register routes
    exports: [RouterModule] // Export RouterModule for use in other modules
})
export class AppRoutingModule {


}


