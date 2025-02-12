import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { Food } from '../../shared/models/food';
import { CartItem } from '../../shared/models/cartitem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart=new Cart;

  constructor() {
    this.cart.items=[];
    // localStorage.setItem('myCart', JSON.stringify(this.cart));
   }
  addToCart(food: Food) {
  const serializedArray = localStorage.getItem('myCart');
  this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();

  let cartItems = this.cart.items; // Reference to cart items array

  console.log("Food in cart=" + cartItems.length);

  // Check if the food already exists in the cart
  let cartItem = cartItems.find(item => item.food.id === food.id);

  if (cartItem) {
    // If item exists, update quantity and price
    cartItem.quantity += 1;
    cartItem.price = cartItem.quantity * food.price; // Corrected price calculation
  } else {
    // If item doesn't exist, create a new CartItem and add it to cart
    cartItem = new CartItem(food);
    cartItems.push(cartItem);
  }

  // Save updated cart back to local storage
  localStorage.setItem('myCart', JSON.stringify(this.cart));
  }

  removeFromCart(food: Food) {
    this.cart.items = this.cart.items.filter((item) => item.food.id !== food.id);//filter out the food item
    localStorage.setItem('myCart', JSON.stringify(this.cart));
  }

  changeQty(foodId: number, flag: boolean) {
    const serializedArray = localStorage.getItem('myCart');
    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
    const item = this.cart.items.find((item) => item.food.id === foodId);
    if (flag) {
      this.cart.items.find((item) => item.food.id === foodId)!.quantity += 1;
    }else {
      this.cart.items.find((item) => item.food.id === foodId)!.quantity -= 1;
      if(item && item.quantity == 0){
        this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
      }
    }
    localStorage.setItem('myCart', JSON.stringify(this.cart));
  }

  getCart() {
    const serializedArray = localStorage.getItem('myCart');
    return serializedArray ? JSON.parse(serializedArray) : new Cart();;
  }
}
