import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'transparencia-upeu';

  constructor() {}
}

@Component({
  selector: 'loading-shape',
  template: `<mat-spinner
    color="primary"
    mode="indeterminate"
    diameter="50"
    value="100"
    strokeWidth="3"></mat-spinner>`,
  host: {
    class: 'loading-shape',
    '[class.global-loading-shape]': 'global',
    '[class.loading-transparent]': 'transparent',
  },
})
export class LoadingShapeComponent implements OnInit {
  @Input() global: boolean = false;
  @Input() transparent: boolean = true;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // if(this.global){
    // 	this.elementRef.nativeElement.style.setProperty('background-color', '#fff');
    // }
  }
}
