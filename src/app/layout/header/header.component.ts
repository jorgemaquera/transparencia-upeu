import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private renderer: Renderer2,
    public authService: AuthService,
    private router: Router
  ) {}

  currentTheme = 'light-theme';

  changeTheme() {
    this.currentTheme = localStorage.getItem('theme')!;
    const theme =
      this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', theme);
    this.renderer.removeClass(document.body, this.currentTheme);
    this.renderer.addClass(document.body, theme);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

