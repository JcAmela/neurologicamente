import { Component, Input, Output, EventEmitter } from '@angular/core';
import Patient from './../../../../../../interfaces/interfaces';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent {
  searchTerm: string = '';

  @Input() allPatients: Patient[] = [];
  @Output() search = new EventEmitter<Patient[]>();

  onSearch() {
    const filteredPatients = this.filterPatients(this.searchTerm);
    this.search.emit(filteredPatients);
  }

  private filterPatients(term: string): Patient[] {
    if (!term.trim()) {
      return this.allPatients.slice();
    }

    term = term.toLowerCase();

    return this.allPatients.filter(patient => {
      const name = (patient.datosPersonales?.nombre || '').toLowerCase();
      const surname = (patient.datosPersonales?.apellidos || '').toLowerCase();
      const phone = patient.datosPersonales?.telefono || '';
      const gender = (patient.datosPersonales?.sexoBiologico || '').toLowerCase();
      const fullName = name + ' ' + surname;

      return name.includes(term) || 
             surname.includes(term) || 
             phone.includes(term) ||
             fullName.includes(term) || 
             gender.includes(term);
    });
  }
}
