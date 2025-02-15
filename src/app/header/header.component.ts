import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
itemCount: number = 0
constructor(private cartService: CartService) {
  this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
}
ngOnInit() {
  this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
}

}
