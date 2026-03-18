import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styles: [`
    .rank-card { background: white; padding: 15px 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); display: flex; align-items: center; margin-bottom: 12px; border: 1px solid #eee; }
    .rank-num { font-size: 1.5rem; font-weight: 900; width: 40px; color: var(--text-light); }
    .rank-1 { color: #F1C40F; text-shadow: 0 2px 5px rgba(241, 196, 15, 0.3); font-size: 2rem; }
    .rank-2 { color: #BDC3C7; text-shadow: 0 2px 5px rgba(189, 195, 199, 0.3); font-size: 1.8rem; }
    .rank-3 { color: #CD7F32; text-shadow: 0 2px 5px rgba(205, 127, 50, 0.3); font-size: 1.6rem; }
    .rank-name { font-weight: 800; font-size: 1.1rem; color: var(--text-dark); flex-grow: 1; margin-left: 15px; }
    .rank-pts { font-weight: 900; font-size: 1.2rem; color: var(--primary); }
    .podium-bg { background: linear-gradient(135deg, white, #FAFAFA); box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: none; transform: scale(1.02); z-index: 10; margin: 15px 0; border-left: 4px solid var(--primary); }
    .user-rank { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; border: none; box-shadow: 0 10px 20px rgba(46,204,113,0.3); border-radius: 16px; margin-top: 24px; }
    .user-rank .rank-name { color: white; }
    .user-rank .rank-pts { color: #E8F5E9; }
    .user-rank .rank-num { color: white; width: auto; min-width: 40px; margin-right: 15px; font-size: 2rem;}
  `]
})
export class LeaderboardComponent implements OnInit {
  ranking: any[] = [];
  userRank: any = null;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let id_usuario = 0;
    if(typeof localStorage !== 'undefined') {
      const uStr = localStorage.getItem('user');
      if (uStr) {
        const u = JSON.parse(uStr);
        id_usuario = u.usuario?.id_usuario || u.id_usuario;
      }
    }
    
    this.http.get('http://localhost:3000/gamificacion/ranking/' + (id_usuario || 0)).subscribe({
      next: (data: any) => { 
        this.ranking = data.top10; 
        this.userRank = data.userRank;
        this.loading = false; 
      },
      error: () => { this.loading = false; }
    });
  }
}
