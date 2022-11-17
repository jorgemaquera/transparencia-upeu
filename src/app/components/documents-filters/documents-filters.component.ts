import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { RzHelperSnippetsService } from '@gabrielcosi/rz-helper-snippets';
import { AREAS, TYPES } from 'src/app/helpers/interfaces';

@Component({
  selector: 'app-documents-filters',
  templateUrl: './documents-filters.component.html',
  styleUrls: ['./documents-filters.component.css'],
})
export class DocumentsFiltersComponent implements OnInit, OnChanges {
  areas = AREAS;
  types = TYPES;

  filtersForm = new FormArray([]);

  @Input() years: number[];

  @Output() onFilter = new EventEmitter();

  constructor(private functions: RzHelperSnippetsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const form = [
      {
        name: 'area',
        label: 'Área',
        type: 'checkbox',
        sections: this.areas.map(area => {
          return {
            name: area.value,
            label: area.label,
            checked: false,
          };
        }),
      },
      {
        name: 'type',
        label: 'Tipo',
        type: 'checkbox',
        sections: this.types.map(type => {
          return {
            name: type.value,
            label: type.label,
            checked: false,
          };
        }),
      },
      {
        name: 'creationDate',
        label: 'Año',
        type: 'daterange',
        sections: this.years.map(year => {
          return {
            name: year,
            label: year,
            checked: false,
          };
        }),
      },
    ];

    this.functions.setForm(this.filtersForm, form);
  }

  ngOnInit(): void {}

  findNested = (obj: any, val: any): any => {
    return Object.keys(obj).find(key =>
      !(typeof obj[key] === 'object')
        ? obj[key] === val
        : this.findNested(obj[key], val)
    );
  };

  filter() {
    const filtersFormValue = this.filtersForm.getRawValue() as any;
    const checkedFilters = filtersFormValue
      .map((filter: any) => ({
        name: filter.name,
        type: filter.type,
        values: filter.sections
          .filter((section: any) => section.checked)
          .map((section: any) => section.name),
      }))
      .filter((filter: any) => filter.values.length > 0);

    this.onFilter.emit(checkedFilters);
  }
}
