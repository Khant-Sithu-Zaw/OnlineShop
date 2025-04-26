import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { UserService } from './services/user/user.service';
import { TimeoutService } from './services/timeout/timeout.service';
import { fromEvent, merge, Subject, takeUntil, throttleTime, } from 'rxjs';
import { DateTime } from 'luxon';
import { SESSION_DURATION } from './shared/constants/constant';
import { CartService } from './services/cart/cart.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'foodstore';
  constructor(private ngZone: NgZone, private userService: UserService, private timeoutService: TimeoutService, private cartService: CartService) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const activityEvents$ = merge(
        fromEvent(window, 'click'),
        // fromEvent(window, 'keydown'),
        // fromEvent(window, 'scroll')
      );

      activityEvents$.pipe(
        throttleTime(100),
      ).subscribe(() => {
        const token = this.userService.currentUser?.token;
        const expiresAt = this.userService.currentUser?.expiresAt;

        if (!token || !expiresAt) return;

        const now = DateTime.now().setZone('Asia/Yangon');
        const expireTime = DateTime.fromISO(expiresAt.toString()).setZone('Asia/Yangon');

        console.log('Now:', now.toISO());
        console.log('Expire At:', expireTime.toISO());

        if (now >= expireTime) {
          console.log('Token expired. Logging out...');
          this.ngZone.run(() => {
            this.userService.logout(this.userService.currentUser, true);
          });
        } else {
          console.log('User active. Session extended.');
          this.timeoutService.extendTokenTime();
        }
      });
    });
  }

  ngOnDestroy() {

  }

}
