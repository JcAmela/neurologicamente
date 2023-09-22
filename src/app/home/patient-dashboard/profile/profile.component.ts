import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../../../../../services/patients.service';
import { DataService } from '../../../../../services/data.service';
import Patient from './../../../../../interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  patients: Patient[] = [];
  allPatients: Patient[] = [];

  constructor(private patientsService: PatientsService, private dataService: DataService) {}

  ngOnInit() {
    this.patientsService.getPatientsOfCurrentUser().subscribe(
      data => {
        this.allPatients = data; 
        this.patients = data; 
      },
      error => {
        console.error('Error al cargar pacientes:', error);
      }
    );
  }

  getPatientAge(birthDate?: Date | string): number {
    if (typeof birthDate === 'string') {
        birthDate = new Date(birthDate);
    }

    if (!(birthDate instanceof Date)) return 0;

    return this.dataService.getAge(birthDate.toISOString().split('T')[0]);
  }

  handleFilteredPatients(filteredPatients: Patient[]) {
    this.patients = filteredPatients;
  }
}
