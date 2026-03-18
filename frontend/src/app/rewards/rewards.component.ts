import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rewards.component.html',
  styles: [`
    .reward-card { background: white; padding: 20px; border-radius: 16px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 20px; margin-bottom: 16px; transition: transform 0.2s; border-left: 6px solid var(--secondary); }
    .reward-card:hover { transform: translateX(5px); box-shadow: var(--shadow-md); }
    .reward-icon { font-size: 3rem; background: #fdf5e6; height: 80px; width: 80px; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .btn-canjear { padding: 8px 16px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; }
    .btn-valid { background: var(--primary); color: white; box-shadow: 0 4px 10px rgba(46,204,113,0.3); }
    .btn-valid:hover { background: var(--primary-dark); transform: translateY(-2px); }
    .btn-disabled { background: #E0E6ED; color: #7f8c8d; cursor: not-allowed; }
  `]
})
export class RewardsComponent implements OnInit {
  recompensas: any[] = [];
  puntos_actuales = 0;
  id_usuario = 0;
  loading = true;
  msg = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        this.id_usuario = user.usuario?.id_usuario || user.id_usuario;
        
        // Fetch user points
        this.http.get(`http://localhost:3000/gamificacion/perfil/${this.id_usuario}`).subscribe((data: any) => {
          this.puntos_actuales = data.puntos;
        });
      }
    }
    this.http.get('http://localhost:3000/recompensas').subscribe({
      next: (data: any) => { this.recompensas = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  canjear(id_recompensa: number) {
    this.http.post('http://localhost:3000/recompensas/canjear', { id_usuario: this.id_usuario, id_recompensa }).subscribe({
      next: (res: any) => {
        this.msg = '✅ ' + res.msg;
        this.puntos_actuales = res.puntos_restantes;
        setTimeout(() => this.msg = '', 4000);
      },
      error: (err) => {
        this.msg = '❌ ' + (err.error?.message || 'Error al canjear');
        setTimeout(() => this.msg = '', 4000);
      }
    });
  }
}
