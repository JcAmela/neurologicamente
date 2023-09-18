import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';      
  password: string = '';    
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  // Método para iniciar sesión con Google
  onLoginWithGoogle() {
    this.authService.loginWithGoogle().subscribe(
      result => {
        this.router.navigate(['/home']);
      },
      error => {
        console.error(error);
      }
    );
  }

  // Método para iniciar sesión con correo y contraseña
  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      result => {
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.';
      }
    );
  }
}
