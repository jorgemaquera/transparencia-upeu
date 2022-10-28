import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent {
  currentTheme = 'light-theme';
  currentSkin = 'blue-skin';

  constructor(private renderer: Renderer2) {
    localStorage.getItem('theme') === null
      ? localStorage.setItem('theme', this.currentTheme)
      : (this.currentTheme = localStorage.getItem('theme')!);

    localStorage.getItem('skin') === null
      ? localStorage.setItem('skin', this.currentSkin)
      : (this.currentSkin = localStorage.getItem('skin')!);

    this.renderer.addClass(document.body, this.currentSkin);
    this.renderer.addClass(document.body, this.currentTheme);
  }
}
