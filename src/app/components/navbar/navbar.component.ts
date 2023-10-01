import { Component, OnInit, HostListener, Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  private auth: Auth = inject(Auth);
  isSticky: boolean = false;
  isLoggedIn = false;


  constructor(private router: Router) {}
  
  ngOnInit(): void {
    onAuthStateChanged(this.auth, user => {
     this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    signOut(this.auth).then(() => {
     this.router.navigate(['/login']);
    });
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    this.isSticky = windowScroll >= 50; 
  }
}
