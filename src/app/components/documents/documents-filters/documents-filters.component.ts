import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentsData } from 'src/app/core/interfaces/documents_data.interface';

@Component({
  selector: 'app-documents-filters',
  templateUrl: './documents-filters.component.html',
  styleUrls: ['./documents-filters.component.css'],
})
export class DocumentsFiltersComponent implements OnChanges {
  @Input() documents: DocumentsData[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.documents = changes['documents'].currentValue;
    console.log(typeof this.documents[0].creationDate);
  }

  getAllFilters(): void {}
}
