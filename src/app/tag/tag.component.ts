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
  constructor(private foodservice: FoodService) { }
  ngOnInit() {
    if (!this.forFoodDetail)
      this.tags = this.foodservice.getAllTags();
  }
}
