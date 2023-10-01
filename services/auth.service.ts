import { Injectable,inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  // Asumiendo que ya has inicializado firebaseApp en algún lugar de tu app
  private auth: Auth = inject(Auth);

  constructor() {}

  register(email: string, password: string): Observable<any> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).catch(error => {
        console.error('Error al registrar usuario: ', error);
        throw new Error('Registro fallido');
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  registerWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }
}
