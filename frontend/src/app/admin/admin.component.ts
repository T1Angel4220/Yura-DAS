import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  rutas: any[] = [];
  nuevaRuta = { nombre: '', zona: '' };
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarRutas();
  }

  cargarRutas() {
    this.http.get('http://localhost:3000/logistica/rutas').subscribe({
      next: (data: any) => this.rutas = data,
      error: () => alert('Error obteniendo rutas')
    });
  }

  crearRuta() {
    if (!this.nuevaRuta.nombre) return;
    this.loading = true;
    this.http.post('http://localhost:3000/logistica/rutas', this.nuevaRuta).subscribe({
      next: (res: any) => {
        this.rutas.push(res);
        this.nuevaRuta = { nombre: '', zona: '' };
        this.loading = false;
        alert('Ruta de recolección creada exitosamente.');
      },
      error: () => {
        alert('Error al crear la ruta.');
        this.loading = false;
      }
    });
  }
}
