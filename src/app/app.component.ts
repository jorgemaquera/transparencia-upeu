import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'transparencia-upeu';

  currentTheme = 'light-theme';
  currentSkin = 'blue-skin';

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, this.currentSkin);
    this.renderer.addClass(document.body, this.currentTheme);
  }
}
