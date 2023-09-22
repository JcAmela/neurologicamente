import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AnamnesisComponent } from './patient-dashboard/patient-register/anamnesis/anamnesis.component';
import { DatosPersonalesComponent } from './patient-dashboard/patient-register/datos-personales/datos-personales.component';
import { HomeComponent } from './home.component';
import { NewsCardComponent } from '../components/newscard/newscard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientRegisterComponent } from './patient-dashboard/patient-register/patient-register.component';
import { PatientSearchComponent } from './patient-dashboard/profile/patient-search/patient-search.component';
import { ProfileComponent } from './patient-dashboard/profile/profile.component';


@NgModule({
  declarations: [
    AnamnesisComponent,
    DatosPersonalesComponent,
    HomeComponent,
    NewsCardComponent,
    PatientDashboardComponent,
    PatientRegisterComponent,
    PatientSearchComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
