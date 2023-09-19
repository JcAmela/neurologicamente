import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { PatientDashboardComponent } from './home/patient-dashboard/patient-dashboard.component';
import { HistoryComponent } from './home/patient-dashboard/patient-register/anamesis/history.component';
import { ProfileComponent } from './home/patient-dashboard/profile/profile.component';
import { PatientRegisterComponent } from './home/patient-dashboard/patient-register/patient-register.component'; 

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'patient-dashboard', 
    component: PatientDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'history', pathMatch: 'full' },
      { path: 'history', component: HistoryComponent },
      { 
        path: 'profile', 
        component: ProfileComponent,
      },
      { path: 'patient-register', component: PatientRegisterComponent } 
    ]
  },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)  
  ],
  exports: [ RouterModule ]  
})
export class AppRoutingModule { }
