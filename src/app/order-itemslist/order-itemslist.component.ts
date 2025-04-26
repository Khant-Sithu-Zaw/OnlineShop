import {
  Component, EventEmitter, Input, OnInit, Output, PipeDecorator
} from '@angular/core';
import { Order } from '../shared/models/order';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultButtonComponent } from "../default-button/default-button.component";

@Component({
  selector: 'order-itemslist',
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './order-itemslist.component.html',
  styleUrl: './order-itemslist.component.css'
})
export class OrderItemslistComponent implements OnInit {
  @Input()
  order!: Order;
  @Output() totalAmount = new EventEmitter<number>();
  constructor() { }
  ngOnInit(): void {
    this.order.totalPrice = 0;
    // Initialization logic here
    if (this.order != null) {
      for (let i = 0; i < this.order.items.length; i++) {
        this.order.totalPrice = this.order.totalPrice + this.order.items[i].price * this.order.items[i].quantity;
      }
      this.totalAmount.emit(this.order.totalPrice);
    }
  }
  // Add any additional properties or methods needed for this component

}
