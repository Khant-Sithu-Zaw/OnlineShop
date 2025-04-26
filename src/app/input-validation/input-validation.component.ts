import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { VALIDATION_MSG } from '../shared/constants/constant';

@Component({
  selector: 'app-input-validation',
  imports: [NgIf, NgFor],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  controls!: AbstractControl;
  @Input()
  showErrors: boolean = false;

  errorMsgs: string[] = [];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controls'] && this.controls)
      this.checkValidation();
  }
  ngOnInit(): void {

    //Status can be: "VALID", "INVALID", "PENDING", or "DISABLED".
    this.controls.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    //Triggered by user input, patchValue/setValue, or programmatic changes.
    this.controls.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }
  checkValidation() {
    const myerror = this.controls.errors;
    if (!myerror) {
      this.errorMsgs = [];
      return;
    }
    this.errorMsgs = Object.keys(myerror).map((key) => {
      const error = myerror[key];
      const msgTemplate = VALIDATION_MSG[key];
      if (typeof msgTemplate === 'function') {
        return msgTemplate(error); // Pass error object to get dynamic message
      }
      return msgTemplate || 'Invalid field';
    });
  }

}
