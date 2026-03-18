import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: any;
  todayResiduo = 'Plástico';
  nextCollection = 'Mañana: Orgánico';
  tips = [
    'El 90% de la gente quiere reciclar pero no sabe cómo. ¡Tú ya eres parte de la solución!',
    'Separar bien tus residuos ayuda a que los recolectores trabajen de forma digna y segura.'
  ];

  ngOnInit() {
    if(typeof localStorage !== 'undefined') {
      const u = localStorage.getItem('user');
      if (u) this.user = JSON.parse(u);
    }
    this.checkNotifications();
  }

  checkNotifications() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Yura PWA', { body: 'Hoy toca sacar: ' + this.todayResiduo });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }
  }
}
