import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private dateService: DateService  
  ) {}

  ngOnInit() {
    this.todayDate = this.dateService.getToday();

    this.registerForm = this.fb.group({
      datosPersonales: this.fb.group({
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        fechaActual: [this.todayDate, Validators.required],
        sexoBiologico: ['Hombre', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['' ]  // Solo permite 10 dígitos
      }),
      diagnostico: this.fb.group({
        nombreDiagnostico: [''],
        dominiosComprometidos: this.fb.array([]),
        informe: ['']  
      })
    });
  }

  get datosPersonalesFormGroup(): FormGroup {
    return this.registerForm.get('datosPersonales')! as FormGroup;
}
get diagnosticoGroup(): FormGroup {
  return this.registerForm.get('diagnostico')! as FormGroup;
}

  get tests(): FormArray {
    return this.registerForm.get('test') as FormArray;
  }

  logInvalidControls(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control instanceof FormGroup) {
        // Recursively check sub-groups
        this.logInvalidControls(control);
      } else if (!control.valid) {
        console.log(`Invalid control: ${key} - Error:`, control.errors);
      }
    });
  }

  onSubmit() {
    console.log('Arrives at onSubmit');

    if (this.registerForm.valid) {
      console.log('Form validated');

      const newPatient: Patient = this.registerForm.value;
      if (newPatient.datosPersonales) {
        console.log('If datos personales exists, save the date');
        newPatient.datosPersonales.fechaActual = this.todayDate;
      }

      this.patientsService.addPatient(newPatient).subscribe(
        () => {
          this.submitMessage = "Patient added successfully";
          this.registerForm.reset();
        },
        error => {
          this.submitMessage = "Error adding patient: " + error.message;
        }
      );
    } else {
      console.log('Form is not valid');
      this.logInvalidControls(this.registerForm);
    }
  }
}
