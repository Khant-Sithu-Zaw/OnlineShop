import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { NgFor, CurrencyPipe ,NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from "../shared/common/star-rating.component";
import { TagComponent } from "../tag/tag.component";
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-food-detail',
  imports: [StarRatingComponent, NgFor, CurrencyPipe, TagComponent, NotFoundComponent,NgIf],
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.css'
})
export class FoodDetailComponent {
  food!: Food;
  constructor(private foodservice: FoodService, private route: ActivatedRoute,private cartService: CartService,private router: Router) {

  }
  ngOnInit() {

    this.route.params.subscribe(params => {

      if (params['id']) {
        this.food = this.foodservice.getFoodById(+params['id']);
        console.log(this.food);
      }

    });
  }
  addItem(){
    this.cartService.addToCart(this.food);
    // this.router.navigate(['/cart']);
  }
}
