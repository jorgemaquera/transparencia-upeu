import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

const data: any[] = [
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Resolución', date: '13/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Acta', date: '12/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Acta', date: '11/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Resolución', date: '10/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Acta', date: '10/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Resolución', date: '10/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Acta', date: '09/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Acta', date: '09/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Resolución', date: '07/07/2022', actions: 'view' },
  { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', type: 'Acta', date: '01/07/2022', actions: 'view' },
];

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, AfterViewInit {
  columns: string[] = ['name', 'type', 'date', 'actions'];
  datasource = new MatTableDataSource<any>(data);;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    this.matPaginatorIntl.itemsPerPageLabel = "Resultados";
    this.matPaginatorIntl.getRangeLabel;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
