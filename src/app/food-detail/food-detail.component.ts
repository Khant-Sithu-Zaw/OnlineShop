import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { NgFor, CurrencyPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TagComponent } from "../tag/tag.component";
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
import { NotFoundComponent } from "../not-found/not-found.component";
import { USER_KEY } from '../shared/constants/constant';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user/user.service';
import { StarRatingComponent } from "../shared/common/star-rating/star-rating.component";

@Component({
  selector: 'app-food-detail',
  imports: [NgFor, CurrencyPipe, TagComponent, NotFoundComponent, NgIf, StarRatingComponent],
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.css'
})
export class FoodDetailComponent {
  food!: Food;
  constructor(private foodservice: FoodService, private route: ActivatedRoute, private cartService: CartService, private router: Router, private toastr: ToastrService, private userService: UserService) {
    // this.food = foodservice.getFoodById(1);
    // this.foodservice.getAll().subscribe(foods => {
    //   this.foods = foods;
    // });

  }
  ngOnInit() {

    // this.route.params.subscribe(params => {

    //   if (params['id']) {
    //     this.food = this.foodservice.getFoodById(+params['id']);
    //     console.log(this.food);
    //   }

    // });
    const id = +this.route.snapshot.paramMap.get('id')!;

    // Call getFoodById which will internally call getAll() and filter by id
    this.foodservice.getFoodById(id).subscribe(
      (food) => {
        if (food) {
          this.food = food;
        } else {
          console.error('Food not found');
        }
        console.log(this.food); // Log the food for debugging
      },
      (error) => {
        console.error('Error fetching food by id:', error);
      }
    );
  }
  addItem() {
    const userInLocal = localStorage.getItem(USER_KEY);
    const userInSession = sessionStorage.getItem(USER_KEY);
    if (!!(userInLocal || userInSession)) {
      this.cartService.addToCart(this.food, this.userService.currentUser?.email);
      this.cartService.triggerBlink();
    }
    else {
      this.toastr.warning("Please login to add items to cart", "Warning");
      this.router.navigate(['/login']);
    }

    // this.router.navigate(['/cart']);
  }
}
