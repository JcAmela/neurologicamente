import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  @Input() diagnosticoGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }
  showInformeField: boolean = false; 
  
  ngOnInit(): void {
  }

  get dominiosComprometidos(): FormArray {
    return this.diagnosticoGroup.get('dominiosComprometidos') as FormArray;
  }

  addDominioComprometido() {
    this.dominiosComprometidos.push(this.fb.control(''));
  }

  removeDominioComprometido(index: number) {
    this.dominiosComprometidos.removeAt(index);
  }


toggleInformeField() {
  this.showInformeField = !this.showInformeField;
}
}
