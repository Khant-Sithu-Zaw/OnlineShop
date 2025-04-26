import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { NgFor, CurrencyPipe, CommonModule } from '@angular/common';
import { Food } from '../shared/models/food';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { TagComponent } from "../tag/tag.component";
import { RouterModule } from '@angular/router';
import { Cart } from '../shared/models/cart';
import { CartService } from '../services/cart/cart.service';
import { NotFoundComponent } from "../not-found/not-found.component";
import { Tag } from '../shared/models/tag';
import { delay, filter } from 'rxjs';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { UserService } from '../services/user/user.service';
import { StarRatingComponent } from "../shared/common/star-rating/star-rating.component";
@Component({
  selector: 'app-home',
  imports: [NgFor, CurrencyPipe, SearchComponent, TagComponent, RouterModule, NotFoundComponent, CommonModule, LoadingScreenComponent, StarRatingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  foods: Food[] = [];
  tags: Tag[] = [];
  isLoading = true;
  constructor(private foodService: FoodService, private route: ActivatedRoute, private cartService: CartService, private cdRef: ChangeDetectorRef, private router: Router, private userService: UserService) {
    // this.foodService.getAll().subscribe(foods => { 

  }

  ngOnInit() {

    this.isLoading = true;

    //this.route.params.subscribe(...) listens for changes in the route parameters.
    this.route.params.subscribe(params => {
      console.log(params['searchTerm']);
      if (params['searchTerm']) {

        this.foodService.getFoods(params['searchTerm']).subscribe(foods => {
          this.foods = foods;
          this.isLoading = false;
        });
      }
      else if (params['tag']) {

        this.foodService.getByTag(params['tag']).subscribe(foods => {
          this.foods = foods;
          this.isLoading = false;
        });

        console.log("tag=>food counts" + this.foods.length);

      }
      else {
        this.foodService.getAll().pipe(delay(300)).subscribe(foods => {
          this.foods = foods;
          this.isLoading = false;
        });


        console.log("Cart Items=" + this.foods.length);

      }
      let cart: Cart = this.cartService.getCart(this.userService.currentUser?.email);
      console.log("Cart Items=" + cart.items.length);
      this.cartService.setItemCountFromOutside(this.cartService.getCartItemsCount(cart.items));

    }
    );

  }

  //rating method
  // updateRating(food: Food, newRating: number) {
  //   this.foodService.updateFoodRating(food.id, newRating);
  // }
}