import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentsData } from 'src/app/core/interfaces/documents_data.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from 'src/app/pages/update/update.component';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css'],
})
export class DocumentsTableComponent implements OnInit, OnChanges {
  @Input() documents: DocumentsData[] = [];

  datasource = new MatTableDataSource<DocumentsData>(this.documents);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columns: string[] = ['name', 'type', 'creationDate', 'actions'];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.matPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    this.matPaginatorIntl.getRangeLabel;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.datasource = new MatTableDataSource<DocumentsData>(
      changes['documents'].currentValue
    );
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }
  openDialog() {
    this.dialog.open(UpdateComponent);
  }
}
