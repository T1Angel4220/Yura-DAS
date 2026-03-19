import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 0;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .driver-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px 15px 100px 15px;
      animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .hero-dashboard {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .hero-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      padding-bottom: 16px;
    }

    .hero-title {
      font-size: 1.6rem;
      font-weight: 800;
      background: linear-gradient(135deg, #2c3e50, #3498db);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .hero-chips {
      display: flex;
      gap: 8px;
    }

    .chip-btn {
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .chip-active { background: rgba(46, 204, 113, 0.15); color: #27ae60; }
    .chip-logout { background: rgba(231, 76, 60, 0.1); color: #e74c3c; box-shadow: 0 2px 8px rgba(231,76,60,0.15); }
    .chip-logout:hover { background: #e74c3c; color: white; transform: translateY(-2px); }

    .route-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .route-label { font-size: 0.9rem; color: #7f8c8d; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

    .target-box {
      background: rgba(255,255,255,0.9);
      padding: 16px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
      border-left: 6px solid;
    }

    .target-day { font-size: 1.1rem; font-weight: 700; color: #2c3e50; margin: 0; }
    .target-desc { font-size: 0.85rem; color: #95a5a6; margin: 4px 0 0 0; font-weight: 500;}

    .target-badge {
      padding: 8px 16px;
      border-radius: 12px;
      color: white;
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }

    .section-title {
      font-size: 1.1rem;
      color: #34495e;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 32px 0 16px 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .validator-card {
      background: white;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.06);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    }

    .validator-card.evaluated {
      transform: scale(0.98);
      opacity: 0.8;
      background: #f8f9fc;
      border: 1px solid rgba(0,0,0,0.05);
    }

    .validator-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .citizen-name { font-size: 1.35rem; font-weight: 800; color: #2c3e50; margin: 0; }
    .citizen-address { font-size: 0.9rem; color: #7f8c8d; font-weight: 500; margin: 4px 0 0 0; display: flex; align-items: center; gap: 4px; }

    .validator-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .btn-validar {
      padding: 16px;
      font-size: 1.1rem;
      font-weight: 800;
      border: none;
      border-radius: 16px;
      cursor: pointer;
      color: white;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 0 rgba(0,0,0,0.1);
    }

    .btn-validar:active { transform: translateY(4px); box-shadow: none; }
    .btn-validar span { font-size: 1.8rem; }

    .btn-success { background: linear-gradient(135deg, #2ecc71, #27ae60); }
    .btn-danger { background: linear-gradient(135deg, #e74c3c, #c0392b); }

    .result-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 1rem;
      width: 100%;
      justify-content: center;
      animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .result-correcto { background: rgba(46, 204, 113, 0.15); color: #27ae60; border: 2px solid rgba(46, 204, 113, 0.3); }
    .result-incorrecto { background: rgba(231, 76, 60, 0.15); color: #c0392b; border: 2px solid rgba(231, 76, 60, 0.3); }

    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
  `]
})
export class DriverComponent implements OnInit {
  usuarios: any[] = [];
  id_conductor: number = 0;
  vibrating: boolean = false;
  
  todayName = '';
  todayDesc = '';
  todayRecoleccion = 'Libre (Ninguna)';
  todayColor = '#bdc3c7';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if(typeof localStorage !== 'undefined') {
      const uStr = localStorage.getItem('user');
      if (uStr) {
        const u = JSON.parse(uStr);
        this.id_conductor = u.usuario? u.usuario.id_usuario : u.id_usuario;
      }
    }

    this.cargarHoy();

    // Load users in the assigned route (Assuming driver accesses route 1 for prototyping)
    this.http.get<any[]>('http://localhost:3000/logistica/usuarios-ruta/1').subscribe((data) => {
      this.usuarios = data.map(u => ({
        ...u,
        evaluado: u.evaluadoHoy,
        resultado: u.resultadoHoy
      }));
    });
  }

  cargarHoy() {
    const dayNameMap: any = { 0: 'Domingo', 1: 'Lunes', 2: 'Martes', 3: 'Miercoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sabado' };
    this.todayName = dayNameMap[new Date().getDay()];
    
    this.http.get('http://localhost:3000/calendario').subscribe((data: any) => {
      const pickup = data.find((c: any) => 
          c.dia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 
          this.todayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );
      if (pickup) {
        this.todayRecoleccion = this.getResiduoName(pickup.tipo_residuo_id);
        this.todayColor = this.getColor(pickup.tipo_residuo_id);
        this.todayDesc = this.getResiduoDesc(pickup.tipo_residuo_id);
      }
    });
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

  getResiduoDesc(id: number) {
    switch(id) {
      case 1: return 'Cajas, hojas, periódicos secos.';
      case 2: return 'Botellas, galoneras y tarrinas limpias.';
      case 3: return 'Frascos y botellas sin tapa.';
      case 4: return 'Restos de comida y cáscaras vegetales.';
      case 5: return 'Cajas de leche y jugo aplastadas.';
      case 9: return 'Basura de baño, envolturas sucias.';
      default: return 'Recolección especializada.';
    }
  }
  
  getColor(id: number) {
      const colors = ['#3498DB', '#F1C40F', '#27AE60', '#8D6E63', '#9B59B6', '#E74C3C', '#7F8C8D', '#D35400', '#566573'];
      return colors[(id-1) % colors.length] || '#7f8c8d';
  }

  validar(usuario: any, estado: string) {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
       window.navigator.vibrate([50, 30, 50]);
    }
    
    // Optimistic UI Update
    usuario.evaluado = true;
    usuario.resultado = estado;

    this.http.post('http://localhost:3000/logistica/validacion/campo', {
      id_conductor: this.id_conductor,
      id_usuario: usuario.id_usuario,
      estado: estado
    }).subscribe({
      next: (res: any) => {
        if (res.error) {
           alert(res.msg);
           usuario.evaluado = false;
        }
      },
      error: () => {
        alert('Error de conexión al validar. Reintentando...');
        usuario.evaluado = false;
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
