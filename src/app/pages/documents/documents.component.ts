import { Component, OnInit } from '@angular/core';
import { DocumentsData } from 'src/app/core/interfaces/documents_data.interface';
import { DocumentService } from 'src/app/core/services/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  documents: DocumentsData[] = [];

  constructor(private readonly documentService: DocumentService) {}

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments(): void {
    this.documentService.getAll().subscribe(documents => {
      this.documents = documents;
    });
  }
}
