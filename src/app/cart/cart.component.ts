import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartitem';
import { NgFor, CurrencyPipe, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotFoundComponent } from "../not-found/not-found.component";
import { DefaultButtonComponent } from "../default-button/default-button.component";
import { MY_CART } from '../shared/constants/constant';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-cart',
  imports: [NgFor, RouterModule, CurrencyPipe, NgIf, NotFoundComponent, DefaultButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart!: Cart;
  total: number = 0;
  totalQty: number = 0;

  constructor(private cartService: CartService, private router: Router, private userService: UserService) {
    // this.cartService.checkSavedUser();
  }
  ngOnInit() {

    let serializedArray = "";
    console.log("Current User Email from cart component: " + this.userService.currentUser?.email);
    // if (this.cartService.Islocal) {
    serializedArray = localStorage.getItem(this.userService.currentUser?.email) || '';
    // }
    // else {
    //   serializedArray = sessionStorage.getItem(this.cartService.userEmail) || '';
    // }

    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
    this.cart.items.forEach(item => {
      this.total += item.food.price * item.quantity;
    });
    this.setQty(this.cart.items);
  }

  removeItem(cartitem: CartItem) {

    this.cartService.removeFromCart(cartitem.food, this.userService.currentUser?.email);
    let serializedArray = "";
    // if (this.cartService.Islocal) {
    serializedArray = localStorage.getItem(this.userService.currentUser?.email) || '';
    // }
    // else {
    //   serializedArray = sessionStorage.getItem(this.cartService.userEmail) || '';
    // }
    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
    this.total = 0;
    this.cart.items.forEach(item => {
      this.total += item.food.price * item.quantity;
    });
    this.setQty(this.cart.items);

  }

  updateQty(cartitem: CartItem, flg: boolean) {
    this.cartService.changeQty(cartitem.food.id, flg, this.userService.currentUser?.email);
    console.log("cartitem.food.id from cart component" + cartitem.food.id);
    console.log("email from cart component" + this.userService.currentUser?.email);
    let serializedArray = "";
    // if (this.cartService.Islocal) {
    serializedArray = localStorage.getItem(this.userService.currentUser?.email) || '';
    // }
    // else {
    //   serializedArray = sessionStorage.getItem(this.cartService.userEmail) || '';
    // }
    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
    console.log("cart from cart component" + this.cart);
    this.total = 0;
    this.cart.items.forEach(item => {
      this.total += item.food.price * item.quantity;
    });
    this.setQty(this.cart.items);
  }

  setQty(items: CartItem[]) {
    this.totalQty = 0;
    items.forEach(item => {
      this.totalQty += item.quantity;
    });
    this.cartService.triggerBlink();
  }
  gotoCheckout() {
    this.router.navigate(['/checkout']);
  }
}
