import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PatientsService } from './../../../../../services/patients.service';
import { DataService } from '../../../../../services/data.service';
import Patient from './../../../../../interfaces/interfaces';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnInit, AfterViewInit {
  registerForm!: FormGroup;  
  todayDate: string = '';
  submitMessage: string = '';  
  currentStep: number = 1; 

  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef  
  ) {}

  @ViewChild(DatosPersonalesComponent) private datosPersonalesComponent!: DatosPersonalesComponent;

  ngOnInit() {
    this.todayDate = this.dataService.getToday();
    this.registerForm = this.fb.group({
      datosPersonales: new FormControl(null), 
      anamnesis: this.fb.group({})  
    });
  }

  ngAfterViewInit() {
    const datosPersonalesControl = this.datosPersonalesComponent.datosPersonalesForm;
    this.registerForm.addControl('datosPersonales', datosPersonalesControl);
    this.cdRef.detectChanges();
  }

  get progressBarValue(): number {
    return this.currentStep * 50;
  }

  nextStep() {
    if (this.currentStep === 1) {
      this.confirmAndSavePersonalData();
    } else if (this.currentStep < 2) {
      this.currentStep++;
    } else {
      this.onSubmit();
    }
  }

  confirmAndSavePersonalData() {
    if (window.confirm('¿Estás seguro de haber rellenado los campos correctamente?')) {
      const patientData: Patient = this.registerForm?.get('datosPersonales')?.value;
      if (patientData) {
        patientData.fechaActual = this.todayDate;
      }
      this.patientsService.addPatient(patientData).subscribe(
        () => {
          this.submitMessage = "Datos personales guardados correctamente";
          this.currentStep++; 
        },
        error => {
          this.submitMessage = "Error guardando datos personales: " + error.message;
        }
      );
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newPatient: Patient = this.registerForm.value;
      if (newPatient.datosPersonales) {
        newPatient.datosPersonales.fechaActual = this.todayDate;
      }
      this.patientsService.addPatient(newPatient).subscribe(
        () => {
          this.submitMessage = "Paciente registrado exitosamente";
          this.registerForm.reset();
        },
        error => {
          this.submitMessage = "Error registrando paciente: " + error.message;
        }
      );
    }
  }
}
