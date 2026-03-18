import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styles: [`
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-top: 20px; }
    .cal-day { 
       padding: 10px 8px; border-radius: 12px; border: 1px solid var(--border-color); min-height: 95px; 
       display: flex; flex-direction: column; background: var(--surface); transition: transform 0.2s, box-shadow 0.2s;
    }
    .cal-day:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); z-index: 2; border-color: var(--primary-light); }
    .cal-day.empty-day { background: #fdfdfd; border: 1px dashed #E0E6ED; opacity: 0.5; }
    .cal-day.has-pickup { background: linear-gradient(to bottom right, #ffffff, #F4FBf7); border-color: rgba(46,204,113,0.4); box-shadow: 0 4px 12px rgba(46,204,113,0.08); }
    .cal-day.is-today { border: 2px solid var(--primary-dark); background: #FFF; box-shadow: 0 0 0 4px rgba(46,204,113,0.15); }
    .day-num { font-weight: 800; font-size: 1.2rem; margin-bottom: 6px; color: var(--text-dark); text-align: right; margin-right: 4px; }
    .pickup-badge { 
       font-size: 0.7rem; font-weight: 800; color: white; padding: 6px 4px; border-radius: 6px; 
       text-align: center; margin-top: auto; line-height: 1.2; text-transform: uppercase; letter-spacing: 0.5px;
       box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
    }
    
    .scroll-wrapper::-webkit-scrollbar { height: 8px; }
    .scroll-wrapper::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
    .scroll-wrapper::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
    .scroll-wrapper::-webkit-scrollbar-thumb:hover { background: #888; }
  `]
})
export class CalendarComponent implements OnInit {
  calendario: any[] = [];
  loading = true;
  error = '';
  
  monthDays: any[] = [];
  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthName = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/calendario').subscribe({
      next: (data: any) => {
        this.calendario = data;
        this.buildCalendar();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Hubo un problema al cargar los datos del servidor.';
        this.loading = false;
      }
    });
  }

  buildCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.monthName = `${months[month]} ${year}`;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    const dayNameMap: any = { 0: 'Domingo', 1: 'Lunes', 2: 'Martes', 3: 'Miercoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sabado' };
    
    for(let i=0; i<firstDayIndex; i++) {
        this.monthDays.push({ empty: true });
    }
    
    for(let d=1; d<=daysInMonth; d++) {
        const dateObj = new Date(year, month, d);
        const dayName = dayNameMap[dateObj.getDay()];
        
        const pickup = this.calendario.find(c => 
            c.dia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
            === dayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        );
        
        this.monthDays.push({
            date: d,
            isToday: d === today.getDate(),
            pickup: pickup ? this.getResiduoName(pickup.tipo_residuo_id) : null,
            color: pickup ? this.getColor(pickup.tipo_residuo_id) : ''
        });
    }
  }

  getResiduoName(id: number) {
    switch(id) {
      case 1: return 'Papel y Cartón';
      case 2: return 'Plástico';
      case 3: return 'Vidrio';
      case 4: return 'Orgánico';
      case 5: return 'Tetra Pak';
      case 6: return 'Pilas';
      case 7: return 'Electrónicos';
      case 8: return 'Aceite';
      case 9: return 'No Reciclable';
      default: return 'Mixto';
    }
  }
  
  getColor(id: number) {
      const colors = ['#3498DB', '#F1C40F', '#27AE60', '#8D6E63', '#9B59B6', '#E74C3C', '#7F8C8D', '#D35400', '#566573'];
      return colors[(id-1) % colors.length] || 'var(--primary)';
  }
}
