import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { from } from 'rxjs';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
