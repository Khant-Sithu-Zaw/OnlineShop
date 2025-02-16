import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports:[ RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
itemCount: number = 0;
isBlinking:boolean=false;

constructor(private cartService: CartService) {
  this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
 this.cartService.isBlinking$.subscribe((state) => {
      this.isBlinking = state;
    });
}
ngOnInit() {
  this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
}

}
