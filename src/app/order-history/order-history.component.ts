import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../shared/interfaces/OrderHistory';
import { OrderService } from '../services/order/order.service';
import { UserService } from '../services/user/user.service';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { USER_KEY } from '../shared/constants/constant';

@Component({
  selector: 'app-order-history',
  imports: [NgFor, CommonModule, LoadingScreenComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orderHistory!: OrderHistory[];
  isLoading: boolean = true;
  constructor(private orderService: OrderService, private userService: UserService) { }
  ngOnInit(): void {
    const localUser = localStorage.getItem(USER_KEY);
    const sessionUser = sessionStorage.getItem(USER_KEY);
    const user = JSON.parse(localUser || sessionUser || '{}');
    console.log("current Date=", Date.now() + "date from laravel=" + user.expiresAt);
    const email = this.userService.currentUser?.email  // Replace with the actual email or fetch it dynamically
    console.log("Email:", email);
    this.orderService.getOrderHistory(email).subscribe({
      next: (data: OrderHistory[]) => {
        this.orderHistory = data;
        console.log(this.orderHistory);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching order history:', err);
      }
    });
  }

}
