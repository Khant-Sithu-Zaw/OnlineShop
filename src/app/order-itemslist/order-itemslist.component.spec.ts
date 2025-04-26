import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemslistComponent } from './order-itemslist.component';

describe('OrderItemslistComponent', () => {
  let component: OrderItemslistComponent;
  let fixture: ComponentFixture<OrderItemslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
