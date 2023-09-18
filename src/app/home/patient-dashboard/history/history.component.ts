import { Component } from '@angular/core';
import { Anamnesis, HistoriaClinicaBiopsicosocial, AntecedentesMedicos, EstadoActual, NuevoDiagnostico } from './../../../../../interfaces/interfaces';  // Asegúrate de especificar el path correcto

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  motivoConsulta: string = '';
  diagnostico: string = '';
  fechaDiagnostico: string = '';
  
  historiaClinicaBiopsicosocial: HistoriaClinicaBiopsicosocial = {
    antecedentesMedicos: {
      antecedente: '',
      diagnostico: '',  
      fechaDiagnostico: ''
    },
    antecedentesFamiliares: ''
};
  
  estadoActual: EstadoActual = {
    estado: '',
    esferaSocial: '',
    esferaCognitiva: '',
    esferaPsicologica: '',
    otraInformacion: '',
    nuevoDiagnostico: {
      diagnostico: '',
      fecha: '',
      nombreClinico: ''
    }
  };

  constructor() {}

}
