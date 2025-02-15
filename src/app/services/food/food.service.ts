import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/food';
import { Tag } from '../../shared/models/tag';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foods: Food[] = [
    { id: 1, name: 'Meatball', cookTime: '10-20', price: 10, favorite: false, origin: ['italy'], stars: 4, imageUrl: '/assets/images/food1.jpg', tags: ['FastFood', 'Lunch', 'Dinner'] },
    { id: 2, name: 'Rice&Chicken', price: 20, cookTime: '20-30', favorite: true, origin: ['persia', 'middle east'], stars: 3.1, imageUrl: '/assets/images/food2.jpg', tags: ['SlowFood', 'Lunch'] },
    { id: 3, name: 'Coconut Noodles', price: 5, cookTime: '10-15', favorite: false, origin: ['germany', 'malaysia'], stars: 2, imageUrl: '/assets/images/food3.jpg', tags: ['SlowFood', 'BreakFast'] },
    { id: 4, name: 'Fried Potatoes', price: 2, cookTime: '15-20', favorite: true, origin: ['belgium', 'france'], stars: 3, imageUrl: '/assets/images/food4.jpg', tags: ['FastFood', 'Fry'] },
    { id: 5, name: 'Fried Chicken', price: 11, cookTime: '40-50', favorite: false, origin: ['europe', 'asia'], stars: 2.5, imageUrl: '/assets/images/food5.jpg', tags: ['FastFood', 'Fry', 'Dinner'] },
    { id: 6, name: 'Hamburger', price: 9, cookTime: '40-50', favorite: false, origin: ['us', 'china'], stars: 4.2, imageUrl: '/assets/images/food6.jpg', tags: ['FastFood', 'Lunch', 'BreakFast'] },
  ];
  constructor() { }
  getAll(): Food[] {
    return this.foods;
  }
  getFoods(searchTerm: string): Food[] {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  getByTag(tag: string): Food[] {

    return tag.toLocaleLowerCase() === 'all' ? this.getAll() : this.getAll().filter(food => food.tags.some(t => t.toLowerCase() === tag.toLowerCase()));

  }
  updateFoodRating(id: number, newRating: number) {
    const food = this.foods.find(f => f.id === id);
    if (food) {
      food.stars = newRating;
    }
  }
  getAllTags(): Tag[] {
    return [
      { name: 'All', count: 6 },
      { name: 'FastFood', count: 4 },
      { name: 'SlowFood', count: 2 },
      { name: 'Lunch', count: 3 },
      { name: 'Dinner', count: 2 },
      { name: 'BreakFast', count: 2 },
      { name: 'Fry', count: 2 },
    ];
  }
  getFoodById(id: number): Food {
    return this.foods.find(f => f.id === id)!;
  }
}
