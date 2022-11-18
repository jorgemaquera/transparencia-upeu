import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RzAlgoliaService } from '@gabrielcosi/rz-algolia-functions';
import * as moment from 'moment-timezone';
import {
  BehaviorSubject,
  catchError,
  map,
  merge,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  of as observableOf,
  debounceTime,
} from 'rxjs';
import { RzRow } from 'src/app/directives/rz-row.directive';
import { SearchParams } from 'src/app/helpers/interfaces';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css'],
})
export class DocumentsTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() tabsStyle: string; // default | joined
  @Input() index: string;
  @Input() columns: any[] = [];
  @Input() rowActions: any[] = [];
  @Input() filterComparator: string = 'AND';
  @Input() searchParams: any = {
    page: 0,
    hitsPerPage: 20,
  };
  @Input() filters: any[] = [];
  @Input() sortActive: string;
  @Input() sortDirection: MatSort['direction'];
  @Input() search: FormControl;

  @Output() onFilter = new EventEmitter();
  @Output() onRefresh = new EventEmitter();

  @Output() rowAction = new EventEmitter();

  sideFilters: any[] = [];
  rowSelected: RzRow | null;
  rowSelectedIndex = -1;
  filter = new BehaviorSubject<any>(null);
  currentFilter: any;
  total = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataSource: any;
  contextMenuPosition = { x: '0px', y: '0px' };
  displayedColumns: Array<string> = [];
  years: number[] = [];
  table: any;
  loadTable = new BehaviorSubject<boolean>(true);

  @ViewChild('filterPanel', { static: false }) filterMenu: MatMenuTrigger;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChildren(RzRow) rzRows: QueryList<RzRow>;

  private unsubscribe = new Subject<void>();

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private algoliaService: RzAlgoliaService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.loadTable.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.getData();
    });
  }

  ngOnInit() {
    this.setColumns();

    this.search.valueChanges
      .pipe(debounceTime(500), takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.runFilters();
      });
  }

  setColumns() {
    const columns = this.columns.map(column => column.key);
    this.displayedColumns = columns;
  }
  runFilters() {
    this.filter.next('filter');
    this.onFilter.emit();
  }

  setFilters(filters: any[]) {
    if (filters) {
      (this.sideFilters = filters.map(filter =>
        filter.type === 'checkbox'
          ? [
              {
                key: filter.name,
                operator: filter.values.length > 1 ? 'IN' : '==',
                value:
                  filter.values.length > 1 ? filter.values : filter.values[0],
              },
            ]
          : [
              {
                key: filter.name,
                operator: 'BETWEEN',
                from: moment(
                  `01/01/${filter.values.length - 1}`,
                  'DD/MM/YYYY'
                ).valueOf(),
                to:
                  filter.values.length > 1
                    ? moment(
                        `31/12/${filter.values.length - 1}`,
                        'DD/MM/YYYY'
                      ).valueOf()
                    : moment(
                        `31/12/${filter.values[0]}`,
                        'DD/MM/YYYY'
                      ).valueOf(),
              },
            ]
      )),
        this.runFilters();
    } else {
      this.sideFilters = [];
      this.runFilters();
    }
  }

  buildParams() {
    let args: SearchParams = {
      index: this.index,
      search: {
        page: this.paginator.pageIndex,
        hitsPerPage: this.searchParams.hitsPerPage
          ? this.paginator.pageSize
          : 0,
      },
    };

    if (this.search.value) {
      args.search['query'] = this.search.value;
    }

    args['orderBy'] = this.sort ? this.sort.active : null;
    args['order'] = this.sort ? this.sort.direction : null;

    //Start the filters set up
    let filters = [...this.filters, ...this.sideFilters];

    //the filters in the columns
    this.columns.map(column => {
      if (column.filters && column.filters.length) {
        column.filters.map((filter: any) => {
          let ORFilters: any = [];
          if (filter.hasOwnProperty('canFilter')) {
            if (!filter.canFilter) return;
          }
          if (filter.type === 'checkbox') {
            filter.choices.getRawValue().map((choice: any) => {
              if (choice.selected) {
                ORFilters = [
                  ...ORFilters,
                  {
                    key: filter.key,
                    value:
                      filter.operator === 'IN' ? [choice.value] : choice.value,
                    operator: choice.operator
                      ? choice.operator
                      : filter.operator,
                  },
                ];
              }
            });
            filter['filtered'] = filter.choices
              .getRawValue()
              .some((choice: any) => choice.selected);
          } else if (filter.type === 'range') {
            const min = filter.min.value;
            const max = filter.max.value;
            if (min && max && min === max) {
              filters = [
                ...filters,
                [
                  {
                    key: filter.key,
                    value: max,
                    operator: '==',
                  },
                ],
              ];
            } else {
              if (min || min === 0) {
                filters = [
                  ...filters,
                  [
                    {
                      key: filter.key,
                      value: min,
                      operator: '>=',
                    },
                  ],
                ];
              }
              if (max || max === 0) {
                filters = [
                  ...filters,
                  [
                    {
                      key: filter.key,
                      value: max,
                      operator: '<=',
                    },
                  ],
                ];
              }
            }
            filter['filtered'] = min || max || min === 0 || max === 0;
          } else if (filter.type === 'daterange') {
            if (filter.from.value && filter.to.value) {
              let from = moment(
                filter.from.value.format('YYYY-MM-DDTHH:mm:ss')
              );
              let to = moment(
                filter.to.value.format('YYYY-MM-DDTHH:mm:ss')
              ).add(1, 'd');
              from =
                filter.hasOwnProperty('tz') && filter.tz
                  ? from.tz(filter.tz).hour(0)
                  : from;
              to =
                filter.hasOwnProperty('tz') && filter.tz
                  ? to.tz(filter.tz).hour(0)
                  : to;

              filters = [
                ...filters,
                [
                  {
                    key: filter.key,
                    value: from.unix() * 1000,
                    operator: '>=',
                  },
                ],
                [
                  {
                    key: filter.key,
                    value: to.unix() * 1000,
                    operator: '<',
                  },
                ],
              ];
            }
            filter['filtered'] =
              filter.from.value && filter.to.value ? true : false;
          }

          if (ORFilters.length) {
            filters = [...filters, ORFilters];
          }
        });
      }
    });

    //the predefined filters
    if (filters && filters.length) {
      args.search['filters'] = filters;
      args.search['filterComparator'] = this.filterComparator;
    }

    return args;
  }

  getData() {
    this.isLoadingResults = true;

    this.paginator.pageIndex = this.searchParams.page;

    // If the user changes the sort order, pageSize or filter, reset back to the first page.
    this.filter
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => (this.paginator.pageIndex = 0));
    this.sort.sortChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => (this.paginator.pageIndex = 0));
    this.paginator.page.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      if (this.searchParams.hitsPerPage !== this.paginator.pageSize) {
        this.paginator.pageIndex = 0;
      }
    });

    merge(this.sort.sortChange, this.paginator.page, this.filter)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.isRateLimitReached = false;

          const args = this.buildParams();

          return this.algoliaService.search(args);
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.total = this.searchParams.hitsPerPage ? data.nbHits : 0;
          this.searchParams.hitsPerPage = data.hitsPerPage;
          this.searchParams.page = this.paginator.pageIndex;

          return data.hits;
        }),
        catchError(err => {
          this.isLoadingResults = false;
          // Catch if the API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;

          console.error(err);

          return observableOf([]);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe(data => {
        this.dataSource.data = data;
        if (this.years.length === 0) {
          this.years = this.getYears(data);
        }
      });
  }

  openFilter(event: any, filter: any, filterPanel: any) {
    event.preventDefault();
    this.currentFilter = filter;
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    filterPanel.openMenu();
    return false;
  }

  filterClosed(event: any) {
    this.currentFilter = null;
  }

  filterFiltered(filter: any) {
    return filter.hasOwnProperty('filtered') && filter.filtered;
  }

  clearFiltersCol(filter: any) {
    if (filter.type === 'checkbox') {
      filter.choices.controls.map((choiceForm: FormGroup, i: any) => {
        if (!choiceForm.get('selected')!.disabled) {
          choiceForm.get('selected')!.setValue(false);
        }

        if (i === filter.choices.controls.length - 1) {
          this.filter.next('filter');
        }
      });
    } else if (filter.type === 'range') {
      filter.min.setValue(null);
      filter.max.setValue(null);
      this.filter.next('filter');
    } else if (filter.type === 'daterange') {
      filter.from.setValue(null);
      filter.to.setValue(null);
      this.filter.next('filter');
    }
  }

  getFilteredChoices(searchValue: string, filter: any) {
    if (searchValue) {
      return filter.choices.controls.filter(
        (c: any) =>
          c.value.label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    }
    return filter.choices.controls;
  }

  onRightClick(event: any, actionsPanel: any, rowData: any, index: number) {
    event.preventDefault();

    if (!this.rowActions.length) return;

    this.rowSelected = this.rzRows.toArray()[index];
    this.rowSelectedIndex = index;
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    actionsPanel.openMenu();
  }

  actionsClosed(event: any) {
    this.rowSelected = null;
    this.rowSelectedIndex = -1;
  }

  runRowAction(action: any, row: RzRow) {
    action.action(row);
    this.rowAction.emit(row);
  }

  getRowActionPermissions({ canActivate }: any, row: RzRow, i: any) {
    if (typeof canActivate === 'boolean') {
      return canActivate;
    }
    return canActivate ? canActivate(row) : true;
  }

  getYears(data: any) {
    let years: number[] = [];
    data.forEach((item: any) => {
      let year = moment(item.creationDate).year();
      if (!years.includes(year)) {
        years.push(year);
      }
    });
    return years.sort((a, b) => b - a);
  }

  removeFromTable(row: any) {
    setTimeout(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (r: any) => r.id !== row.data.id
      );
    }, 100);
  }

  refreshTable() {
    setTimeout(() => {
      this.loadTable.next(true);
      this.onRefresh.emit();
    }, 3000);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
