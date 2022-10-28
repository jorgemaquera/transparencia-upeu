import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  currentTheme = 'light-theme';

  ngOnInit(): void {}

  changeTheme() {
    this.currentTheme = localStorage.getItem('theme')!;
    const theme =
      this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', theme);
    this.renderer.removeClass(document.body, this.currentTheme);
    this.renderer.addClass(document.body, theme);
  }
}
