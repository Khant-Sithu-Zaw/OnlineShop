import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-screen',
  imports: [NgIf],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css'
})
export class LoadingScreenComponent implements OnInit {
  @Input()
  isLoading: boolean = false;
  ngOnInit(): void {

  }

}
