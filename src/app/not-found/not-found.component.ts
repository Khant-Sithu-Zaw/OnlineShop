import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [NgIf,RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  @Input() visible: boolean = false;
  @Input() message: string = 'Nothing found';
  @Input() resetLinkText: string = 'Reset';
  @Input() resetRoute: string = '/';
}
