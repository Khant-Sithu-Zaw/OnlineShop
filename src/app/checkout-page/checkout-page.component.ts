import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { DefaultButtonComponent } from "../default-button/default-button.component";
import { InputValidationComponent } from "../input-validation/input-validation.component";
import { OrderItemslistComponent } from "../order-itemslist/order-itemslist.component";
import { MapComponent } from "../map/map.component";
import { OrderService } from '../services/order/order.service';
import { IOrder } from '../shared/interfaces/IOrder';
import { Router } from '@angular/router';
import { USER_KEY } from '../shared/constants/constant';

@Component({
  selector: 'app-checkout-page',
  imports: [ReactiveFormsModule, DefaultButtonComponent, InputValidationComponent, OrderItemslistComponent, MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  isOrdered: boolean = false;
  order!: Order
  checkoutForm!: FormGroup
  constructor(private cartService: CartService, private fb: FormBuilder, private userService: UserService, private toastrService: ToastrService, private orderService: OrderService, private router: Router) {
    this.order = new Order();
    const cart = this.cartService.getCart(this.userService.currentUser?.email);
    this.order.items = cart.items;
    this.order.totalPrice = 0;
  }
  ngOnInit() {

    if (this.userService.currentUser?.token) {
      console.log("User is logged in")
      let {
        name,
        userDetail: { address, phone }
      } = this.userService.currentUser;
      this.checkoutForm = this.fb.group({
        name: [name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        address: ['', Validators.required],
        phone: [phone, [Validators.required, Validators.pattern('^09[1-9][0-9]{6,8}$')]],
      });
    } else {
      console.log("User is not logged in")
      this.checkoutForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],

      });
    }
  }
  get fc() {
    return this.checkoutForm.controls;
  }
  createOrder() {
    this.isOrdered = true;
    if (this.checkoutForm.invalid) {
      this.toastrService.error("User Information is required", "Error")
      return;
    }
    const myOrder: IOrder = {
      username: this.fc['name'].value,
      address: this.fc['address'].value,
      phone: this.fc['phone'].value,
      email: this.userService.currentUser?.email,
      totalPrice: this.order.totalPrice,
      status: "Pending",
      orderItem: this.order.items.map((item: any) => ({
        id: item.food.id,
        qty: item.quantity,
        price: item.price
      }))

    }
    console.log(myOrder);
    console.log("Placing order...");
    this.orderService.saveOrder(myOrder).subscribe({

      next: (response) => {
        console.log('Order saved successfully!', response);
        sessionStorage.removeItem(this.userService.currentUser?.email);
        localStorage.removeItem(this.userService.currentUser?.email);
        this.cartService.resetItemCount();
        setTimeout(() => {
          this.router.navigate(['/orderHistory']);
        }, 300);
        // Maybe navigate or show success message here
      },
      error: (err) => {
        console.error('Error saving order:', err);
        // Handle errors (e.g. form errors, API errors, etc.)
      }
    });
  }
  handleLocationName(locationName: string) {
    this.fc['address']?.setValue(locationName);

  }
  getTotalPrice(totalPrice: number) {
    this.order.totalPrice = totalPrice;
  }
}
