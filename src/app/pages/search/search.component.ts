import { Component, OnInit } from '@angular/core';
import { RzHelperSnippetsService } from '@gabrielcosi/rz-helper-snippets';
import { FormBuilder, FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { DocumentData } from '../documents/documents';
import { AREAS, TYPES } from 'src/app/helpers/interfaces';
import { RzRow } from 'src/app/directives/rz-row.directive';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  index: string = 'prod_documents';

  sortActive: string;
  sortDirection: Sort['direction'] = 'desc';
  columns: any[] = [];
  filters: any[] = [];
  rowActions: any[] = [];

  search: FormControl = new FormControl();

  constructor(
    private functions: RzHelperSnippetsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setColumns();
    this.setFilters({ deprecated: false });
    this.setRowActions();
  }

  setFilters({ deprecated = false }) {
    this.filters = [
      [
        {
          key: 'deprecated',
          operator: '==',
          value: deprecated,
        },
      ],
    ];
  }

  setColumns() {
    this.columns = [
      {
        label: 'Nombre',
        display: true,
        sorting: false,
        key: 'name',
        content: (document: DocumentData) => {
          return `<b class="h6 pointer">${document.name}</b>`;
        },
        onClick: (event: any, row: any, cell: any) => {
          window.open(row.data.file.downloadURL, '_blank');
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
        content: (document: DocumentData) => {
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
        content: (document: DocumentData) => {
          return TYPES.find(type => type.value === document.type)?.label;
        },
        filters: [
          {
            type: 'checkbox',
            key: 'type',
            operator: '==',
            choices: this._fb.array([
              ...TYPES.map(l =>
                this._fb.group({
                  id: l.value,
                  value: l.value,
                  label: l.label,
                  selected: false,
                })
              ),
            ]),
          },
        ],
      },
      {
        label: 'Area',
        display: true,
        key: 'area',
        sorting: false,
        canActivate: () => true,
        content: (document: DocumentData) => {
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
          window.open(row.data.file.downloadURL, '_blank');
        },
      },
    ];
  }
}
