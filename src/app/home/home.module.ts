
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsCardComponent } from '../components/newscard/newscard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { HistoryComponent } from './patient-dashboard/history/history.component';
import { ProfileComponent } from './patient-dashboard/profile/profile.component';
import { PatientRegisterComponent } from './patient-dashboard/patient-register/patient-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientSearchComponent } from './patient-dashboard/profile/patient-search/patient-search.component';
import { DatosPersonalesComponent } from './patient-dashboard/patient-register/datos-personales/datos-personales.component';


@NgModule({
  declarations: [
    HomeComponent,
    NewsCardComponent,
    PatientDashboardComponent,
    HistoryComponent,
    ProfileComponent,
    PatientRegisterComponent,
    PatientSearchComponent,
    DatosPersonalesComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
