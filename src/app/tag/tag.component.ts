import { Component, Input } from '@angular/core';
import { Tag } from '../shared/models/tag';
import { CommonModule } from '@angular/common';
import { FoodService } from '../services/food/food.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-tag',
  imports: [CommonModule, RouterModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  @Input() forFoodDetail?: String[];
  @Input() justifyContent: String = "center";
  foodtages?: String[] = [];
  tags?: Tag[];
  loading: boolean = true;
  constructor(private foodservice: FoodService) { }
  ngOnInit() {
    if (!this.forFoodDetail) {

      this.foodservice.getAllTags().subscribe(
        (data) => {
          this.tags = data;
        },
        (error) => {
          console.error('Error fetching tags:', error);
        }
      );
      console.log("Tags " + this.tags);
    }

  }
}
