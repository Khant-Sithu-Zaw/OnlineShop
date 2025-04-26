import { Injectable, OnInit } from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { Food } from '../../shared/models/food';
import { CartItem } from '../../shared/models/cartitem';
import { BehaviorSubject } from 'rxjs';
import { USER_KEY } from '../../shared/constants/constant';
import { User } from '../../shared/models/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart;
  private itemCountSource = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSource.asObservable();
  private blinkingState = new BehaviorSubject<boolean>(false);
  isBlinking$ = this.blinkingState.asObservable();
  public Islocal = false;
  public userEmail = '';
  triggerBlink() {
    this.blinkingState.next(true);

    // Stop blinking after 3 seconds
    setTimeout(() => {
      this.blinkingState.next(false);
    }, 1000);
  }

  constructor() {
    const userJson = sessionStorage.getItem(USER_KEY);
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userEmail = user.email;
    }
    console.log("userEmail from cart service constructor" + userJson);
    // this.checkSavedUser();
    let serializedArray = ""
    // if (this.Islocal) {
    serializedArray = localStorage.getItem(this.userEmail) || '';
    // }
    // else {
    //   serializedArray = sessionStorage.getItem(this.userEmail) || '';
    // }

    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
    console.log("CartItem" + this.cart.items.length);
    this.itemCountSource.next(this.getCartItemsCount(this.cart.items));
  }


  checkSavedUser() {
    const userfromLocal = localStorage.getItem(USER_KEY);
    const userfromSession = sessionStorage.getItem(USER_KEY);
    if (userfromLocal) {
      const user = JSON.parse(userfromLocal);
      this.userEmail = user.email;
      this.Islocal = true;
    } else {
      const user = JSON.parse(userfromSession || '{}');
      this.userEmail = user.email;
      this.Islocal = false;
    }
  }
  addToCart(food: Food, email: string) {
    this.userEmail = email;
    let serializedArray = ""
    // if (this.Islocal) {
    serializedArray = localStorage.getItem(this.userEmail) || '';
    // }
    // else {
    //   serializedArray = sessionStorage.getItem(this.userEmail) || '';
    // }

    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();

    let cartItems = this.cart.items; // Reference to cart items array

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
    // if (this.Islocal) {
    localStorage.setItem(this.userEmail, JSON.stringify(this.cart)); // Save to local storage
    // }
    // else {
    //   sessionStorage.setItem(this.userEmail, JSON.stringify(this.cart));
    // }
    this.itemCountSource.next(this.getCartItemsCount(this.cart.items));

  }

  removeFromCart(food: Food, email: string) {
    this.userEmail = email;
    this.cart.items = this.cart.items.filter((item) => item.food.id !== food.id);//filter out the food item
    this.checkSavedUser();
    // if (this.Islocal) {
    localStorage.setItem(this.userEmail, JSON.stringify(this.cart));
    // }
    // else {
    //   sessionStorage.setItem(this.userEmail, JSON.stringify(this.cart));
    // }

    this.itemCountSource.next(this.getCartItemsCount(this.cart.items));

  }

  changeQty(foodId: number, flag: boolean, email: string) {
    this.userEmail = email;
    console.log("userEmail" + this.userEmail);
    let serializedArray = ""
    // if (this.Islocal) {

    serializedArray = localStorage.getItem(this.userEmail) || '';
    // }
    // else {
    //   serializedArray = sessionStorage.getItem(this.userEmail) || '';
    // }


    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
    console.log("cart from changeQty cartservice" + this.cart.items.length);
    const item = this.cart.items.find((item) => item.food.id === foodId);
    if (flag) {
      this.cart.items.find((item) => item.food.id === foodId)!.quantity += 1;
    } else {
      this.cart.items.find((item) => item.food.id === foodId)!.quantity -= 1;
      if (item && item.quantity == 0) {
        this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
      }
    }
    // if (this.Islocal) {

    localStorage.setItem(this.userEmail, JSON.stringify(this.cart));
    // }
    // else {
    //   sessionStorage.setItem(this.userEmail, JSON.stringify(this.cart));
    // }

    this.itemCountSource.next(this.getCartItemsCount(this.cart.items));

  }

  getCart(email: string): Cart {
    this.userEmail = email;
    // this.checkSavedUser();
    let serializedArray = ""
    // if (this.Islocal) {

    serializedArray = localStorage.getItem(this.userEmail) || '';
    // }
    // else {
    //   serializedArray = sessionStorage.getItem(this.userEmail) || '';
    // }
    return serializedArray ? JSON.parse(serializedArray) : new Cart();;
  }
  getCartItemsCount(cartItems: CartItem[]): number {
    let count = 0;
    cartItems.forEach(item => {
      count += item.quantity;
    });
    return count;
  }
  resetItemCount() {
    this.itemCountSource.next(0);
  }
  setItemCountFromOutside(count: number) {
    this.itemCountSource.next(count);
  }
}
