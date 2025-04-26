import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/food';
import { Tag } from '../../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Target } from '@angular/compiler';
import { FOODLIST_API, TAGS_API } from '../../shared/constants/constant';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foods: Food[] = [];
  private tags: Tag[] = [];
  constructor(private http: HttpClient) {

  }
  foodArray$: Observable<Food[]> | undefined;
  tagArray$: Observable<Tag[]> | undefined;
  getFromAPI(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODLIST_API).pipe(
      map((foods) => foods.map((foodData: any) => this.transformToFoodModel(foodData)))
    );
  }

  private transformToFoodModel(foodData: any): Food {
    const food = new Food();

    food.id = foodData.id;
    food.name = foodData.name;
    food.price = parseFloat(foodData.price);
    food.stars = parseFloat(foodData.stars);
    food.favorite = foodData.fav === 1; // Assuming 1 means favorite and 0 means not favorite
    food.imageUrl = foodData.imgUrl;
    food.cookTime = foodData.cookTime;

    // Transform the tag array to a simple list of strings
    food.tags = foodData.tag.map((tag: any) => tag.name);

    // Transform the origin array to a simple list of strings
    food.origin = foodData.origin.map((origin: any) => origin.name);

    return food;
  }

  getAll(): Observable<Food[]> {
    if (this.foodArray$) {
      return this.foodArray$;
    } else {
      this.foodArray$ = this.getFromAPI().pipe(
        shareReplay(1),
        tap((data) => {
          this.foods = data;
          console.log(this.foods); // Data will be printed only when it is 
        })
      );
      return this.foodArray$;
    }
  }

  getFoods(searchTerm: string): Observable<Food[]> {
    return this.getAll().pipe(
      map(foods => foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }
  getByTag(tag: string): Observable<Food[]> {
    return this.getAll().pipe(
      map(foods => tag.toLocaleLowerCase() === 'all' ? foods : foods.filter(food => food.tags.some(t => t.toLowerCase() === tag.toLowerCase())))
    );
  }
  updateFoodRating(id: number, newRating: number) {
    const food = this.foods.find(f => f.id === id);
    if (food) {
      food.stars = newRating;
    }
  }
  getAllTags(): Observable<Tag[]> {
    if (this.tagArray$) {
      return this.tagArray$;
    }
    else {
      this.tagArray$ = this.http.get<any[]>(TAGS_API).pipe(
        shareReplay(1),
        map(response =>
          response.map(item => ({
            name: item.tag_name, // Mapping API's name to the model's name
            count: item.food_count, // Mapping API's food_count to the model's count
          }))
        )
      );
      return this.tagArray$;
    }
  }

  getFoodById(id: number): Observable<Food | undefined> {
    return this.getAll().pipe(
      map(foods => foods.find(f => f.id === id)), // Find the food by id
      tap(food => {
        if (food) {
          console.log(food); // Log the found food for debugging
        } else {
          console.log('Food not found');
        }
      })
    );
  }
}
