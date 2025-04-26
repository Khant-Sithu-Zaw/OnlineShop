import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
import { CommonModule } from '@angular/common';
import { User } from '../shared/models/user';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  itemCount: number = 0;
  isBlinking: boolean = false;
  currentUser!: User;
  isLoggedIn: boolean = false;
  constructor(private cartService: CartService, private userService: UserService) {
    // this.cartService.itemCount$.subscribe(count => {
    //   this.itemCount = count;
    // });

  }
  ngOnInit() {
    if (this.userService.currentUser?.token) {
      console.log("User is logged in")
      this.currentUser = this.userService.currentUser;
      this.isLoggedIn = !!this.currentUser && !!this.currentUser.token;
    }

    this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
    this.cartService.isBlinking$.subscribe((state) => {
      this.isBlinking = state;
    });
    this.userService.userObservable.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user && !!user.token;
      console.log("isLoggedIn=" + this.isLoggedIn) // or user.email etc., 
    });
  }
  logout() {
    this.userService.logout(this.currentUser, false);
    this.currentUser = new User(); // Reset currentUser to a new User instance
    // this.cartService.clearCart(); // Clear the cart when logging out
    // this.cartService.updateItemCount(0); // Reset item count to 0
    console.log("Logout successful")

  }

}
