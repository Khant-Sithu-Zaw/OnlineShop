import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartitem';
import { NgFor, CurrencyPipe,NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from "../not-found/not-found.component";
@Component({
  selector: 'app-cart',
  imports: [NgFor, RouterModule, CurrencyPipe, NgIf, NotFoundComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart!:Cart;
  total:number=0;
  totalQty:number=0;
  constructor(private cartService:CartService) { 

  }
  ngOnInit() {
   const serializedArray = localStorage.getItem('myCart');
   this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
   this.cart.items.forEach(item=>{
    this.total+=item.food.price*item.quantity;
    });
    this.setQty(this.cart.items);
  }

  removeItem(cartitem: CartItem) {
    this.cartService.removeFromCart(cartitem.food);
    const serializedArray = localStorage.getItem('myCart');
    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
    this.total=0;
      this.cart.items.forEach(item=>{
    this.total+=item.food.price*item.quantity;
    });
    this.setQty(this.cart.items);
  }

  updateQty(cartitem: CartItem,flg:boolean) {
    this.cartService.changeQty(cartitem.food.id,flg);
    const serializedArray = localStorage.getItem('myCart');
    this.cart = serializedArray ? JSON.parse(serializedArray) : new Cart();
     this.total=0;
     this.cart.items.forEach(item=>{
    this.total+=item.food.price*item.quantity;
    });
    this.setQty(this.cart.items);
  }

  setQty(items:CartItem[]){
    this.totalQty=0;
    items.forEach(item=>{
      this.totalQty+=item.quantity;
    });
  }
}
