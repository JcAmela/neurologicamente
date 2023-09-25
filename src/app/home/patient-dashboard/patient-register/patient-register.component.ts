import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PatientsService } from './../../../../../services/patients.service';
import { DataService } from '../../../../../services/data.service';
import Patient from './../../../../../interfaces/interfaces';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { AnamnesisComponent } from './anamnesis/anamnesis.component';

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
  patientId: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef  
  ) {}

  @ViewChild(DatosPersonalesComponent) private datosPersonalesComponent!: DatosPersonalesComponent;
  @ViewChild(AnamnesisComponent) private anamnesisComponent!: AnamnesisComponent;  

  ngOnInit() {
    this.todayDate = this.dataService.getToday();
    this.registerForm = this.fb.group({
      datosPersonales: new FormControl(null),
      anamnesis: new FormControl(null) 
    });
  }

  ngAfterViewInit() {
    const datosPersonalesControl = this.datosPersonalesComponent.datosPersonalesForm;
    this.registerForm.addControl('datosPersonales', datosPersonalesControl);
    if (this.anamnesisComponent) {  
      const anamnesisControl = this.anamnesisComponent.anamnesisForm; 
      this.registerForm.addControl('anamnesis', anamnesisControl);
    }
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
        if (this.patientId) {
            // Si ya existe un patientId, actualiza el documento existente.
            this.patientsService.savePersonalData(patientData, this.patientId).subscribe(
                () => {
                    this.submitMessage = "Datos personales guardados correctamente";
                    this.currentStep++;
                },
                error => {
                    console.error('Error guardando datos personales:', error.message);
                    this.submitMessage = "Error guardando datos personales: " + error.message;
                }
            );
        } else {
            // Si no existe un patientId, crea un nuevo documento.
            this.patientsService.addPatient(patientData).subscribe(
                (patientId) => {
                    console.log('ID del Paciente:', patientId);
                    this.submitMessage = "Datos personales guardados correctamente";
                    this.currentStep++;
                    this.patientId = patientId;
                },
                error => {
                    console.error('Error guardando datos personales:', error.message);
                    this.submitMessage = "Error guardando datos personales: " + error.message;
                }
            );
        }
    }
}


  onSubmit() {
    if (this.registerForm.valid) {;
      const datosPersonales: any = this.registerForm.get('datosPersonales')?.value;
      const anamnesis: any = this.registerForm.get('anamnesis')?.value;
      if (datosPersonales) {
        datosPersonales.fechaActual = this.todayDate;
      }
      const patientId = this.patientId;  // Asegúrate de que patientId no sea null
      console.log('ID del Paciente:', patientId);
      if (patientId) {
        this.patientsService.savePersonalData(datosPersonales, patientId).subscribe(
          () => {
            this.submitMessage = "Datos personales guardados correctamente";
            if (anamnesis) {
              this.patientsService.saveAnamnesis(anamnesis, patientId).subscribe(
                () => {
                  this.submitMessage += " y anamnesis guardada correctamente";
                  this.registerForm.reset();
                },
                error => {
                  this.submitMessage = "Error guardando anamnesis: " + error.message;
                }
              );
            } else {
              this.registerForm.reset();
            }
          },
          error => {
            this.submitMessage = "Error guardando datos personales: " + error.message;
          }
        );
      } 
    } 
  }
}  
