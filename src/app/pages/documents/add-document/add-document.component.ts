import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DocumentService } from 'src/app/pages/documents/document.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AREAS, TYPES } from 'src/app/helpers/interfaces';

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
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    creationDate: new FormControl(moment(), [Validators.required]),
    area: new FormControl('', [Validators.required]),
    shouldNotify: new FormControl(false),
    recipients: new FormControl([] as Array<string>, [Validators.required]),
  });

  types = TYPES;

  areas = AREAS;

  maxDate = moment();

  file: any = null;
  pdfSrc: any = null;
  uploading: boolean = false;

  private unsubscribe = new Subject<void>();

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  onFileSelected() {
    let $pdf: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        this.file = $pdf.files[0];
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }

  removeFile() {
    this.pdfSrc = null;
    this.file = null;
  }

  addRecipient(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    const validEmail = value.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );

    if (value && validEmail && validEmail[0]) {
      this.isValidEmail = true;
      this.documentForm.value.recipients!.push(value);
    } else if (value) {
      this.isValidEmail = false;
    }
    event.chipInput!.clear();
  }

  removeRecipient(recipient: string): void {
    const index = this.documentForm.value.recipients!.indexOf(recipient);
    if (index >= 0) {
      this.documentForm.value.recipients!.splice(index, 1);
    }
  }

  cancel() {
    this.router.navigate(['/documents']);
  }

  async save() {
    this.uploading = true;
    const id = this.documentService.firestoreAutoId();

    const file = await this.documentService.uploadFile(this.file, id);
    const documentData = this.documentForm.getRawValue();
    await this.documentService.add(id, {
      file,
      name: documentData.name!,
      type: documentData.type!,
      code: documentData.code!,
      creationDate: documentData.creationDate!.toDate(),
      area: documentData.area!,
      deprecated: false,
    });
    if (documentData.shouldNotify) {
      this.documentService.notifyInterestedParties(
        documentData.recipients!,
        documentData.name!,
        documentData.creationDate!
      );
    }
    this.router.navigate(['/documents']);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
