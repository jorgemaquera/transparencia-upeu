import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RzHelperSnippetsService } from '@gabrielcosi/rz-helper-snippets';
import { RzRow } from 'src/app/directives/rz-row.directive';
import { AREAS, TYPES } from 'src/app/helpers/interfaces';
import { DocumentsData } from './documents';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  index: string = 'prod_documents';

  sortActive: string;
  sortDirection: Sort['direction'] = 'desc';
  columns: any[] = [];
  filters: any[] = [];
  rowActions: any[] = [];

  search: FormControl = new FormControl();

  constructor(
    private functions: RzHelperSnippetsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setColumns();
    this.setFilters({ deprecated: false });
    this.setRowActions();
  }

  setFilters({ deprecated = false }) {
    this.filters = [
      /* [
        {
          key: 'deprecated',
          operator: '==',
          value: deprecated,
        },
      ], */
    ];
  }

  setColumns() {
    this.columns = [
      {
        label: 'Nombre',
        display: true,
        sorting: false,
        key: 'name',
        content: (document: DocumentsData) => {
          return `<b class="h6 pointer">${document.name}</b>`;
        },
        onClick: (event: any, row: any, cell: any) => {
          window.open(row.data.fileUrl, '_blank');
        },
      },
      {
        label: 'Fecha de creación',
        display: true,
        key: 'creationDate',
        sorting: false,
        filters: [
          {
            type: 'daterange',
            canFilter: true,
            key: 'creationDate',
            from: new FormControl(),
            to: new FormControl(),
          },
        ],
        canActivate: () => true,
        content: (document: DocumentsData) => {
          return `<span>${
            document.creationDate
              ? this.functions.dateFormat(
                  document.creationDate,
                  'MMM DD, YYYY h:mm A'
                )
              : ''
          }</span>`;
        },
      },
      {
        label: 'Tipo',
        display: true,
        key: 'type',
        sorting: false,
        canActivate: () => true,
        content: (document: DocumentsData) => {
          return TYPES.find(type => type.value === document.type)?.label;
        },
      },
      {
        label: 'Area',
        display: true,
        key: 'area',
        sorting: false,
        canActivate: () => true,
        content: (document: DocumentsData) => {
          return AREAS.find(area => area.value === document.area)?.label;
        },
      },
    ];
  }

  setRowActions() {
    this.rowActions = [
      {
        label: 'Open in new tab',
        icon: 'open_in_new',
        canActivate: (row: RzRow) => {
          return true;
        },
        action: (row: RzRow) => {
          window.open(row.data.fileUrl, '_blank');
        },
      },
      {
        label: 'Delete',
        icon: 'delete',
        canActivate: (row: RzRow) => {
          return true;
        },
        action: (row: RzRow) => {},
      },
    ];
  }

  addDocument() {
    this.router.navigate(['/documents/add']);
  }
}
