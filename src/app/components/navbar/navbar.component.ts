import { Component, OnInit, HostListener } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSticky: boolean = false;
  isLoggedIn = false;

  private auth: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.auth = getAuth();
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
