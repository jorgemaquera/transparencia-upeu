import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/core/services/document.service';
import { DocumentsData } from 'src/app/core/interfaces/documents_data.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  documents: DocumentsData[] = [];

  constructor(private readonly documentService: DocumentService) {}

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments(): void {
    this.documentService.getAll().subscribe(documents => {
      this.documents = documents;
      console.log(this.documents);
    });
  }
}
