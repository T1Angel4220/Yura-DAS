import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guide.component.html'
})
export class GuideComponent implements OnInit {
  residuosReciclables: any[] = [];
  residuosNoReciclables: any[] = [];
  loading = true;
  error = '';
  activeTab: 'reciclable' | 'no-reciclable' = 'reciclable';

  setTab(tab: 'reciclable' | 'no-reciclable') {
    this.activeTab = tab;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if(typeof localStorage !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const id_usuario = user.usuario?.id_usuario || user.id_usuario;
        this.http.post('http://localhost:3000/gamificacion/sumar', { id_usuario, accion: 'VER_GUIA' }).subscribe({ next: () => {}, error: () => {} });
      }
    }
    this.http.get<any[]>('http://localhost:3000/residuos').subscribe({
      next: (data) => {
        // ID 9 is 'Basura Común (No Reciclable)'
        this.residuosReciclables = data.filter(r => r.id_tipo !== 9);
        this.residuosNoReciclables = data.filter(r => r.id_tipo === 9);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Hubo un problema al cargar los datos del servidor.';
        this.loading = false;
      }
    });
  }

  getEjemplos(ejemplosStr: string): string[] {
    if (!ejemplosStr) return [];
    return ejemplosStr.split(',').map(e => e.trim());
  }

  getIcon(nombre: string) {
    if (nombre.toLowerCase().includes('papel')) return '📄';
    if (nombre.toLowerCase().includes('plástico')) return '🧴';
    if (nombre.toLowerCase().includes('vidrio')) return '🍾';
    if (nombre.toLowerCase().includes('tetra')) return '🧃';
    if (nombre.toLowerCase().includes('pilas')) return '🔋';
    if (nombre.toLowerCase().includes('electrónico')) return '💻';
    if (nombre.toLowerCase().includes('aceite')) return '🛢️';
    if (nombre.toLowerCase().includes('común')) return '🗑️';
    return '🍎';
  }
}
