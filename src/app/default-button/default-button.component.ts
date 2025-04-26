import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  imports: [NgClass],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent implements OnInit {
  ngOnInit(): void {

  }
  @Input()
  btnType: 'submit' | 'button' = 'button'; // Default to 'button' if not specified
  @Input()
  btnText: string = 'Submit'; // Default text
  @Input()
  bgColor: string = 'bg-red-400 hover:bg-red-600'; // Default background color
  @Input()
  textColor: string = 'text-white'; // Default text color 
  @Input()
  btnWidth: string = 'w-full'; // Default width 
  @Output()
  btnClick = new EventEmitter<void>(); // Event emitter for button click
}
