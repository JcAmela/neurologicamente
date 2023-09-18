import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
        nombreDiagnostico: [''],  // Ahora es opcional
        dominiosComprometidos: this.fb.array([])  // Ya era opcional, no hay cambios aquí
      }),

    });

  }

  get dominiosComprometidos(): FormArray {
    return this.registerForm.get('diagnostico.dominiosComprometidos') as FormArray;
  }

  addDominioComprometido() {
    this.dominiosComprometidos.push(this.fb.control(''));
  }

  removeDominioComprometido(index: number) {
    this.dominiosComprometidos.removeAt(index);
  }

  get tests(): FormArray {
    return this.registerForm.get('test') as FormArray;
  }

  logInvalidControls(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        if (control instanceof FormGroup) {
            // Recursivamente verificará sub-grupos
            this.logInvalidControls(control);
        } else if (!control.valid) {
            console.log(`Control inválido: ${key} - Error:`, control.errors);
        }
    });
}

onSubmit() {
    console.log('llega a onsubmit');

    if (this.registerForm.valid) {
        console.log('Formulario validado');

        const newPatient: Patient = this.registerForm.value;
        if (newPatient.datosPersonales) {
            console.log('si datos personales existe guarda la fecha');
            newPatient.datosPersonales.fechaActual = this.todayDate;
        }

        this.patientsService.addPatient(newPatient).subscribe(
            () => {
                this.submitMessage = "Paciente agregado con éxito";
                this.registerForm.reset();
            },
            error => {
                this.submitMessage = "Error al agregar paciente: " + error.message;
            }
        );
    } else {
        console.log('Formulario no es válido');
        this.logInvalidControls(this.registerForm);
    }
}

}
