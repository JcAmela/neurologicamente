import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-anamnesis',
  templateUrl: './anamnesis.component.html',
  styleUrls: ['./anamnesis.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnamnesisComponent),
      multi: true
    }
  ]
})
export class AnamnesisComponent implements OnInit, ControlValueAccessor {
  anamnesisForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.anamnesisForm = this.fb.group({
      motivoConsulta: ['', Validators.required],
      historiaClinicaBiopsicosocial: [''],
      antecedentesMedicos: [''],
      antecedentesFamiliares: [''],
      estadoActual: this.fb.group({
        esferaSocial: [''],
        esferaCognitiva: [''],
        esferaPsicologica: [''],
        otraInformacion: [''],
        nuevoDiagnostico: this.fb.group({
          diagnostico: [''],
          fecha: [''],
          nombreClinico: ['']
        })
      })
    });
  }

  ngOnInit() {}

  writeValue(value: any): void {
    if (value) {
      this.anamnesisForm.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.anamnesisForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.anamnesisForm.disable({ emitEvent: false });
    } else {
      this.anamnesisForm.enable({ emitEvent: false });
    }
  }

  isSectionOpen: { [key: string]: boolean } = {
    'generalInfo': false,
    'currentStatus': false
  };

  toggleSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
        element.classList.toggle('show');
        this.isSectionOpen[sectionId] = !this.isSectionOpen[sectionId];
    }
  }
  resetForm(): void {
    this.anamnesisForm.reset();  // Esto restablecerá todos los campos del formulario
  }
  
}
