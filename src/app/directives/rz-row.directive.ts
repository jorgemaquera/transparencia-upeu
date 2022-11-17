import { Directive, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[rz-row]',
})
export class RzRow implements OnInit {
  @Input() data: any;
  @Input() index: number;

  updateRowData = new BehaviorSubject<any>(null);

  constructor() {}

  ngOnInit() {}

  updateData(data: any) {
    this.data = data;
    this.updateRowData.next(data);
  }
}
