import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Yura PWA';
  constructor(public router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}
  
  logout() {
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('user');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('user') !== null;
    }
    return false;
  }

  isCitizen() {
    if(isPlatformBrowser(this.platformId)){
      const uStr = localStorage.getItem('user');
      if (uStr) {
        const u = JSON.parse(uStr);
        const userObj = u.usuario || u.user || u;
        return !userObj.rol || userObj.rol === 'ciudadano';
      }
    }
    return false;
  }
}
