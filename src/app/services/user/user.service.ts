import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, of, EMPTY, throwError } from 'rxjs';
import { User } from '../../shared/models/user';
import { IUserLogin } from '../../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../shared/interfaces/LoginResponse';
import { UserDetail } from '../../shared/models/userdetail';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';
import { LOGIN_API, LOGOUT_API, REGIST_API, USER_KEY } from '../../shared/constants/constant';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  //only userservice can access and update the userSubject
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  //readOnly variable to access the userSubject
  public userObservable !: Observable<User>;
  constructor(private http: HttpClient, private toastr: ToastrService, private cartService: CartService) {
    this.userObservable = this.userSubject.asObservable();
  }

  // pipe() = "process or transform the data"

  //subscribe() = "receive the final result after all pipe processing is done"
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<LoginResponse>(LOGIN_API, userLogin).pipe(
      map(response => {
        const myuser: User = {
          id: response.user.id.toString(),
          name: response.user.name,
          email: response.user.email,
          password: '', // Password not returned from API
          token: response.token,
          expiresAt: new Date(response.expiresAt).getTime(),
          lastUsedAt: new Date(response.lastUsed).getTime(),
          userDetail: response.user.userDetail  // Replace with actual logic if needed
        };
        const rememberMe = false;//temporary fix, need to implement remember me functionality

        this.setUserToStorage(myuser, rememberMe); // save to local storage
        this.userSubject.next(myuser);
        console.log('User is logged in expired at' + this.currentUser.expiresAt) // update subject
        return myuser;                  // return to whoever called login()
      }),
      tap(user => {
        this.toastr.success(`Login successful ${user.name}`, 'Can order food now');
      }),
      catchError(error => {
        const msg = error.status === 404
          ? 'Email does not exist'
          : error.status === 401
            ? 'Incorrect password'
            : 'Please try again';

        this.toastr.error(msg, 'Login Failed');
        return throwError(() => error);
      })
    );
  }
  public setUserToStorage(user: User, rememberMe: boolean) {

    sessionStorage.setItem(USER_KEY, JSON.stringify(user)); // save to session storage

  }
  public getUserFromLocalStorage(): User {
    const user = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as User;
    }
    return new User();
  }
  logout(user: User, isExpired: boolean) {
    const token = this.getUserFromLocalStorage()?.token;
    console.log('Token:', token); // Check if the token is being retrieved correctly
    // Clear the cart when logging out
    if (!token) {
      this.toastr.error('No token found, logout failed');
      return;
    }
    // Send logout request to backend
    this.http.post(LOGOUT_API, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        sessionStorage.removeItem(USER_KEY);
        this.userSubject.next(new User());
        if (isExpired) {
          this.toastr.success('Session Expired', 'Please login again', {
            timeOut: 2000,
            extendedTimeOut: 2000,
            closeButton: true,
            progressBar: true
          });

        } else {
          this.toastr.success('Logged out successfully', '', {
            timeOut: 2000,
            closeButton: true,
            progressBar: true
          });
        }

        // Clear the user data in BehaviorSubject
        setTimeout(() => {
          window.location.reload();
        }, 2000);// Optionally reload the page to reset the app state
      },
      error: () => {
        this.toastr.error('Logout failed');
      }
    });
  }
  register(formData: FormData): Observable<User> {
    return this.http.post<User>(REGIST_API, formData).pipe(
      tap((response) => {
        // Show success toast with the response message if needed
        this.toastr.success('Registration successful', 'Please Login to order food');
      }),
      catchError((error) => {
        // Handle error here
        if (error.status === 409) {
          this.toastr.error('This email is already registered.', 'User Exists');
        } else {
          this.toastr.error('Registration failed', 'Something went wrong');
        }
        return throwError(() => error);
      })
    );
    //     You put oranges(data) on a conveyor belt.
    // The belt passes through:
    // A machine that checks the color(like tap())
    // A machine that squeezes the juice(like map())
    // A machine that throws away bad ones(like filter() or catchError())
    // pipe() is just a way to hook these machines together in one line.
  }
  public get currentUser(): User {
    return this.userSubject.value; // Get the current value of the user subject
  }
  public set currentUser(updateuser: User) {
    this.userSubject.next(updateuser);
  }
}
