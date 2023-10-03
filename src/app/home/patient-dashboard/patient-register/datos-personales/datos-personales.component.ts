import { Component, OnInit, forwardRef, } from '@angular/core';
import { FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatosPersonalesComponent),
      multi: true
    }
  ]
})

export class DatosPersonalesComponent implements OnInit, ControlValueAccessor {
  datosPersonalesForm = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    sexoBiologico: ['Hombre', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['']
  });

  constructor(private fb: FormBuilder) {}
  isSending = false; 
  ngOnInit() {}


  writeValue(value: any): void {
    if (value) {
      this.datosPersonalesForm.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.datosPersonalesForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.datosPersonalesForm.disable({ emitEvent: false });
    } else {
      this.datosPersonalesForm.enable({ emitEvent: false });
    }
  }
}