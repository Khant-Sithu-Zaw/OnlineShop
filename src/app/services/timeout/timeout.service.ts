import { Injectable, NgZone, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOKEN_API } from '../../shared/constants/constant';
import { debounceTime, fromEvent, merge } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService implements OnInit {

  constructor(private http: HttpClient, private zone: NgZone, private userService: UserService) { }
  ngOnInit(): void {
    console.log("TimeoutService initialized" + this.userService.currentUser?.token);
  }

  extendTokenTime() {
    const token = this.userService.currentUser?.token // Replace with actual token retrieval logic
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    console.log('Activity sent' + token);
    this.http.post<any>(TOKEN_API, {}, { headers }).subscribe({
      next: (res) => {

        const currentUser = this.userService.currentUser;
        if (currentUser) {
          const updatedUser = {
            ...currentUser, // Keep all existing values
            lastUsedAt: res.lastUsed, // Overwrite only this
            expiresAt: res.expiresAt
          };
          this.userService.currentUser = updatedUser;
          this.userService.setUserToStorage(updatedUser, false); // Save updated user to local storage
          console.log('Updated lastUsedAt and expiresAt:', this.userService.currentUser?.lastUsedAt, this.userService.currentUser?.expiresAt);
        }

      }
      ,
      error: (err) => {
        console.error('Error extending token time:', err);
      }



    }
    );
  }
}
