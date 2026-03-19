import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: any;
  id_usuario = 0;
  validacionStatus: any = { estado: 'pendiente' };
  todayResiduo = 'Plástico';
  nextCollection = 'Mañana: Orgánico';
  tips = [
    'El 90% de la gente quiere reciclar pero no sabe cómo. ¡Tú ya eres parte de la solución!',
    'Separar bien tus residuos ayuda a que los recolectores trabajen de forma digna y segura.'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if(typeof localStorage !== 'undefined') {
      const uStr = localStorage.getItem('user');
      if (uStr) {
        const u = JSON.parse(uStr);
        this.user = u;
        this.id_usuario = u.usuario?.id_usuario || u.id_usuario;
        
        this.http.get(`http://localhost:3000/logistica/validacion-hoy/${this.id_usuario}`).subscribe({
          next: (res: any) => this.validacionStatus = res,
          error: () => this.validacionStatus = { estado: 'pendiente' }
        });
      }
    }
  }

}
