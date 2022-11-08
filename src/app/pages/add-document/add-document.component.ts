import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable,
  UploadTask,
} from '@angular/fire/storage';
import { Subject, takeUntil } from 'rxjs';
import { DocumentService } from 'src/app/core/services/document.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

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
    recipients: new FormControl([], [Validators.required]),
  });

  types = [
    { value: 'acta', label: 'Acta' },
    { value: 'resolucion', label: 'Resolución' },
    { value: 'acuerdo', label: 'Acuerdo' },
  ];

  areas = [
    { value: 'proyeccion_social', label: 'Proyección Social' },
    { value: 'investigacion', label: 'Investigación' },
  ];

  file: any = null;
  pdfSrc: any = null;
  uploadPercent: any;

  private unsubscribe = new Subject<void>();

  constructor(
    private storage: Storage,
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
  }

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

  cancel() {
    this.router.navigate(['/documents']);
  }

  uploadFile() {
    const storageRef = ref(this.storage, `files/${this.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.file);

    uploadTask.then(data => {
      getDownloadURL(data.ref).then(async url => {
        const documentData = this.documentForm.getRawValue();
        await this.documentService.add({
          fileUrl: url,
          name: documentData.name!,
          type: documentData.type!,
          code: documentData.code!,
          creationDate: documentData.creationDate!.toDate(),
          area: documentData.area!,
          deprecated: false,
        });
        this.router.navigate(['/documents']);
      });
    });
    // Percentage observer
    percentage(uploadTask)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(percentage => {
        this.uploadPercent = percentage.progress;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
