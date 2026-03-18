import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styles: [`
    .profile-card { background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; }
    .avatar { width: 100px; height: 100px; background: linear-gradient(135deg, var(--primary), var(--primary-light)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin: 0 auto 15px; box-shadow: 0 5px 15px rgba(46,204,113,0.3); }
    .level-badge { background: var(--secondary); color: white; padding: 6px 16px; border-radius: 20px; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 20px; }
    .points-display { font-size: 3.5rem; font-weight: 900; color: var(--text-dark); line-height: 1; margin-bottom: 5px; }
    .progress-container { background: #E0E6ED; border-radius: 10px; height: 12px; width: 100%; margin: 20px 0 10px; overflow: hidden; }
    .progress-bar { background: var(--primary); height: 100%; border-radius: 10px; transition: width 1s ease-in-out; }
  `]
})
export class ProfileComponent implements OnInit {
  perfil: any = null;
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const id_usuario = user.usuario?.id_usuario || user.id_usuario;
        
        this.http.get(`http://localhost:3000/gamificacion/perfil/${id_usuario}`).subscribe({
          next: (data) => { this.perfil = data; this.loading = false; },
          error: () => { this.loading = false; }
        });
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
