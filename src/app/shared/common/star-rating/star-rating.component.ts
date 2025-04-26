import { Component, Input, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  imports: [NgFor, NgClass],
  selector: 'app-star-rating',
  standalone: true,
  template: `
   <div class="mb-3">
  <span class="rate-star" [style.]="" *ngFor="let star of stars(); let i = index"
      (click)="!readOnly && rate(i + 1); $event.preventDefault()"
      [ngClass]="{'filled': star === 'filled', 'half-filled': star === 'half'}"
       [style.cursor]="readOnly ? 'default' : 'pointer'">
  ★
</span>
</div>
  `,
  styleUrl: './star-rating.component.css',
  encapsulation: ViewEncapsulation.None  // Disable view encapsulation

})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() readOnly: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();  // Emit rating changes
  constructor(private cdr: ChangeDetectorRef) { }
  stars() {
    return Array(5).fill('').map((_, i) =>
      i < Math.floor(this.rating) ? 'filled' :
        i < Math.ceil(this.rating) && this.rating % 1 !== 0 ? 'half' : ''
    );
  }

  rate(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating); // Notify parent component
  }
}