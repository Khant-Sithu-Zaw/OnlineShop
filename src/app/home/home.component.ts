import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { NgFor, CurrencyPipe } from '@angular/common';
import { Food } from '../shared/models/food';
import { StarRatingComponent } from '../shared/common/star-rating.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { TagComponent } from "../tag/tag.component";
import { RouterModule } from '@angular/router';
import { Cart } from '../shared/models/cart';
import { CartService } from '../services/cart/cart.service';
import { NotFoundComponent } from "../not-found/not-found.component";
@Component({
  selector: 'app-home',
  imports: [NgFor, StarRatingComponent, CurrencyPipe, SearchComponent, TagComponent, RouterModule, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  foods: Food[] = [];

  constructor(private foodService: FoodService, private route: ActivatedRoute,private cartService:CartService) {
    // localStorage.clear();
  }

  ngOnInit() {

    //this.route.params.subscribe(...) listens for changes in the route parameters.
    this.route.params.subscribe(params => {
      console.log(params['searchTerm']);
      if (params['searchTerm']) {
        // this.foods = this.foodService.getAll().filter(food => food.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
        this.foods = this.foodService.getFoods(params['searchTerm']);
      }
      else if (params['tag']) {
        // this.foods = this.foodService.getAll().filter(food => food.tags.includes(params['tag']));
        this.foods = this.foodService.getByTag(params['tag']);
      }
      else {
        this.foods = this.foodService.getAll();
        let cart:Cart= this.cartService.getCart();
        console.log("Cart Items="+cart.items.length);
      }
    }
    );
  }
  updateRating(food: Food, newRating: number) {
    this.foodService.updateFoodRating(food.id, newRating);
  }
}