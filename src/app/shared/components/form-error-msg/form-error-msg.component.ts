import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ac-form-error-msg',
  templateUrl: './form-error-msg.component.html',
  styleUrls: ['./form-error-msg.component.scss'],
})
export class FormErrorMsgComponent implements OnInit {
  @Input() field: AbstractControl;
  @Input() error: string;
  @Input() message: string;
  constructor() {}

  ngOnInit() {}

  shouldShowComponent() {
    if (
      (this.field.touched || this.field.dirty) &&
      this.field.errors?.[this.error]
    ) {
      return true;
    }
    return false;
  }
}
