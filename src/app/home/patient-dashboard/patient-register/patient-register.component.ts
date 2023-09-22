import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PatientsService } from './../../../../../services/patients.service';
import { DateService } from '../../../../../services/data.service';
import Patient from './../../../../../interfaces/interfaces';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({});
  todayDate: string = '';
  submitMessage: string = '';  
  currentStep: number = 1; 

  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private dateService: DateService  
  ) {}

  ngOnInit() {
    this.todayDate = this.dateService.getToday();
    this.registerForm = this.fb.group({
      datosPersonales: this.fb.group({}),
      diagnostico: this.fb.group({})
    });
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

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  confirmAndSavePersonalData() {
    if (window.confirm('¿Estás seguro de haber rellenado los campos correctamente?')) {
      const patientData: Patient = this.registerForm?.get('datosPersonales')?.value

      if (patientData) {
        patientData.fechaActual = this.todayDate;
      }

      this.patientsService.addPatient(patientData).subscribe(
        () => {
          this.submitMessage = "Datos personales guardados correctamente";
          this.nextStep();
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
    } else {
      // Puedes agregar lógica adicional aquí si lo consideras necesario
    }
  }
}
