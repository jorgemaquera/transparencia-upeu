import {
  AfterViewInit,
  Directive,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { RzRow } from './rz-row.directive';

@Directive({
  selector: '[rz-cell]',
  host: {
    '[innerHTML]': 'safeHtml',
    '(click)': 'onClick($event)',
  },
})
export class RzCell implements AfterViewInit, OnDestroy {
  @Input() column: any;
  @Input() rows: QueryList<RzRow>;
  @Input() index: number;

  row: RzRow;

  private _safeHtml: SafeHtml = '';

  set safeHtml(value: SafeHtml) {
    this._safeHtml = value;
  }

  get safeHtml(): SafeHtml {
    return this._safeHtml;
  }

  private unsubscribe = new Subject<void>();

  constructor(public sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    this.rows.changes
      .pipe(
        switchMap(() => {
          const rows = this.rows.toArray();
          this.row = rows[this.index];
          return this.row.updateRowData;
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.loadHTML();
      });
  }

  private loadHTML() {
    this.safeHtml = this.getHTML();
  }

  getHTML() {
    const html: any =
      this.column?.content && this.row
        ? this.column.content(this.row.data)
        : '';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onClick(event: any) {
    this.column.onClick ? this.column.onClick(event, this.row, this) : '';
  }

  updateCell() {
    this.loadHTML();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
