import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
})
export class AddDocumentComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isValidEmail = true;
  addOnBlur = true;

  documentForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    recipients: new FormControl([], [Validators.required]),
  });
  constructor() {}

  addRecipient(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    const validEmail = value.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );

    // if (value && validEmail && validEmail[0]) {
    //     this.isValidEmail = true
    //     this.email.headers.to.push(value)
    // } else if (value) {
    //     this.isValidEmail = false
    // }
    event.chipInput!.clear();
  }

  removeRecipient(recipient: string): void {
    // const index = this.email.headers.to.indexOf(recipient)
    // if (index >= 0) {
    //     this.email.headers.to.splice(index, 1)
    // }
  }
}
