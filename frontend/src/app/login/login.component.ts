import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isRegister = false;
  user = { nombre: '', email: '', password: '' };
  error = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {
    if(typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }
  }

  toggleMode() {
    this.isRegister = !this.isRegister;
    this.error = '';
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    const url = this.isRegister ? 'http://localhost:3000/usuarios/register' : 'http://localhost:3000/usuarios/login';
    
    this.http.post(url, this.user).subscribe({
      next: (res: any) => {
        if(typeof localStorage !== 'undefined'){
          localStorage.setItem('user', JSON.stringify(res));
        }
        
        const userObj = res.usuario || res.user || res;
        if (userObj.rol === 'conductor') {
           this.router.navigate(['/driver']);
        } else if (userObj.rol === 'admin') {
           this.router.navigate(['/admin']);
        } else {
           this.router.navigate(['/dashboard']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error de autenticación';
        this.loading = false;
      }
    });
  }
}
