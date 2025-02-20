import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-validation',
  templateUrl: './message-validation.component.html',
  styleUrl: './message-validation.component.css',
})
export class MessageValidationComponent {
  @Input() field: any;
  @Input() label: string = '';
  @Input() customError: string = ''; // New Input for custom error message

}
