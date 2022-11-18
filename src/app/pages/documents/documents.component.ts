import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RzAlgoliaService } from '@gabrielcosi/rz-algolia-functions';
import { RzComponentsService } from '@gabrielcosi/rz-components';
import { RzFirestoreService } from '@gabrielcosi/rz-firestore-functions';
import { RzHelperSnippetsService } from '@gabrielcosi/rz-helper-snippets';
import * as moment from 'moment-timezone';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DocumentsTableComponent } from 'src/app/components/documents-table/documents-table.component';
import { RzRow } from 'src/app/directives/rz-row.directive';
import { AREAS, TYPES } from 'src/app/helpers/interfaces';
import { DocumentService } from './document.service';
import { DocumentData } from './documents';

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
  @ViewChild(DocumentsTableComponent) pageTable: DocumentsTableComponent;

  private unsubscribe = new Subject<void>();

  constructor(
    private functions: RzHelperSnippetsService,
    private router: Router,
    private sharedComponents: RzComponentsService,
    private documentService: DocumentService,
    private firestoreService: RzFirestoreService,
    private algoliaService: RzAlgoliaService
  ) {}

  ngOnInit(): void {
    this.setColumns();
    this.setFilters({ deprecated: false });
    this.setRowActions();
    this.listenTable();
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
      {
        label: 'Código',
        display: true,
        key: 'code',
        sorting: false,
        canActivate: () => true,
        content: (document: DocumentData) => {
          return document.code;
        },
      },
      {
        label: 'Obsoleto',
        display: true,
        key: 'deprecated',
        sorting: false,
        canActivate: () => true,
        content: (document: DocumentData) => {
          return document.deprecated ? 'Si' : 'No';
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
      {
        label: 'Update',
        icon: 'update',
        canActivate: (row: RzRow) => {
          return true;
        },
        action: (row: RzRow) => {
          const data = {
            title: 'Editar documento',
            cancelLabel: 'Cancelar',
            okLabel: 'Guardar',
            fields: [
              {
                type: 'text',
                name: 'name',
                label: 'Nombre del documento',
                required: true,
                appearance: 'fill',
                value: row.data.name,
              },
              {
                type: 'date',
                name: 'creationDate',
                label: 'Fecha de creación',
                required: true,
                appearance: 'fill',
                value: moment(row.data.creationDate),
              },
              {
                type: 'select',
                name: 'type',
                label: 'Tipo de documento',
                required: true,
                appearance: 'fill',
                choices: TYPES,
                value: row.data.type,
              },
              {
                type: 'select',
                name: 'area',
                label: 'Área',
                required: true,
                appearance: 'fill',
                choices: AREAS,
                value: row.data.area,
              },
              {
                type: 'text',
                name: 'code',
                label: 'Código',
                required: true,
                appearance: 'fill',
                value: row.data.code,
              },
              {
                type: 'slide-toggle',
                name: 'deprecated',
                label: 'Obsoleto',
                required: true,
                appearance: 'fill',
                value: row.data.deprecated,
              },
              {
                type: 'file',
                name: 'file',
                label: 'Archivo',
                value: row.data.file ? [row.data.file] : [],
                dropzone: true,
                maxLength: 1,
                appearance: 'fill',
              },
            ],
            onSubmit: async (fields: any) => {
              try {
                const name = fields[0].value;
                const creationDate = fields[1].value.toDate();
                const type = fields[2].value;
                const area = fields[3].value;
                const code = fields[4].value;
                const deprecated = fields[5].value;
                const file = fields[6].value[0];

                let fileObj;
                if (file && !file.path) {
                  fileObj = await this.documentService.uploadFile(
                    this.functions.dataURLtoFile(
                      file.downloadURL,
                      file.filename
                    ),
                    row.data.id
                  );
                }

                const document: DocumentData = {
                  name,
                  creationDate,
                  type,
                  area,
                  code,
                  deprecated,
                  file: fileObj ? fileObj : row.data.file,
                };

                await this.documentService.update(row.data.id, document);
                this.sharedComponents.openSnackBar(
                  'Documento actualizado!',
                  'success'
                );
                this.pageTable.refreshTable();
                return true;
              } catch (e) {
                this.sharedComponents.openSnackBar(e, 'error');
                return Promise.reject(e);
              }
            },
          };

          this.sharedComponents.openFormModal({ data });
        },
      },
      {
        label: 'Delete',
        icon: 'delete',
        canActivate: (row: RzRow) => {
          return true;
        },
        action: (row: RzRow) => {
          this.sharedComponents
            .openConfirmDialog('¿Está seguro que desea eliminar el documento?')
            .afterClosed()
            .subscribe(data => {
              if (data === true) {
                this.pageTable.removeFromTable(row);
                this.documentService.delete(row.data.id);
              }
            });
        },
      },
    ];
  }

  addDocument() {
    this.router.navigate(['/documents/add']);
  }

  listenTable() {
    this.firestoreService
      .getCollection({ collection: 'documents' })
      .pipe(debounceTime(5000), takeUntil(this.unsubscribe))
      .subscribe(async () => {
        if (this.pageTable) {
          const args = this.pageTable.buildParams();

          const response: any = await this.algoliaService.search(args);

          this.pageTable.dataSource.data = response.hits;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
