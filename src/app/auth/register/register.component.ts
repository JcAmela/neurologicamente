import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { DBaseService } from '../../../../services/d-base.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private router: Router, 
              private authService: AuthService, 
              private dbService: DBaseService) { }

  onRegister() {
    this.isLoading = true;
    if (this.isValidForm()) {
        this.authService.register(this.user.email, this.user.password).pipe(
            switchMap(result => this.dbService.addUid(this.user))
        ).subscribe(
            () => {
                this.isLoading = false;
                this.successMessage = 'Registro exitoso. Redirigiendo...';
                this.redirectAfterDelay(['/login']);
            },
            error => {
                this.isLoading = false;
                this.errorMessage = error.code ? this.formatFirebaseError(error.code) : 'Error al guardar UID.';
            }
        );
    } else {
        this.isLoading = false;
    }
  }

  onRegisterWithGoogle() {
    this.isLoading = true;
    this.authService.registerWithGoogle().subscribe(
      result => {
        this.isLoading = false;
        this.successMessage = 'Registro con Google exitoso. Redirigiendo...';
        this.redirectAfterDelay(['/home']);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Error al registrarse con Google.';
      }
    );
  }

  isValidForm(): boolean {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return false;
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(this.user.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&#).';
      return false;
    }
    return true;
  }

  formatFirebaseError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso por otro usuario.';
      case 'auth/invalid-email':
        return 'El correo electrónico introducido no es válido.';
      case 'auth/operation-not-allowed':
        return 'La autenticación por correo electrónico y contraseña no está habilitada.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      default:
        return 'Hubo un error al registrarse. Por favor intenta nuevamente.';
    }
  }

  redirectAfterDelay(route: string[], delay: number = 2000) {
    setTimeout(() => {
        this.router.navigate(route);
    }, delay);
  }
}
