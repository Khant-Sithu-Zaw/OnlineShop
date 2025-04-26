import { Injectable } from '@angular/core';
import { Order } from '../../shared/models/order';
import { ORDERDETAIL_API, ORDERSAVE_API } from '../../shared/constants/constant';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from '../../shared/interfaces/IOrder';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { OrderHistory } from '../../shared/interfaces/OrderHistory';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }
  saveOrder(order: IOrder): Observable<any> {
    return this.http.post(ORDERSAVE_API, order).pipe(
      tap(() => {
        this.toastr.success('Order placed successfully!', 'Success');
      }),
      catchError(error => {
        this.toastr.error('Failed to place order. Please try again.', 'Error');
        return throwError(() => error); // important to propagate error necessarily
      })
    );
  }
  getOrderHistory(email: string): Observable<OrderHistory[]> {
    console.log(email)
    return this.http.post<OrderHistory[]>(ORDERDETAIL_API, { email }).pipe(
      tap(() => {
        this.toastr.success('Order history fetched successfully!', 'Success');
      }),
      catchError(error => {
        this.toastr.error('Failed to fetch order history. Please try again.', 'Error');
        return throwError(() => error);
      })
    );
  }
}
