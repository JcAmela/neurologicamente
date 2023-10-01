import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  private auth: Auth = inject(Auth);
  
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      onAuthStateChanged(this.auth, user => {
        const isLoggedIn = !!user;
        if (!isLoggedIn) {
          console.log('Acceso denegado');
          this.router.navigate(['/login']);
        }
        observer.next(isLoggedIn);
        observer.complete();
      });
    });
  }
}
