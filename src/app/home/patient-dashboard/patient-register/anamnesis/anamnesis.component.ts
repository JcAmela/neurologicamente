import { Component } from '@angular/core';
import { Anamnesis } from '../../../../../../interfaces/interfaces';  // Asegúrate de especificar el path correcto

@Component({
  selector: 'app-anamnesis',
  templateUrl: './anamnesis.component.html',
  styleUrls: ['./anamnesis.component.css']
})
export class AnamnesisComponent {
  anamnesis: Anamnesis = {
    motivoConsulta: '',
    historiaClinicaBiopsicosocial: '',
    antecedentesMedicos: '',
    antecedentesFamiliares: '',

    estadoActual: {
      esferaSocial: '',
      esferaCognitiva: '',
      esferaPsicologica: '',
      otraInformacion: '',
      nuevoDiagnostico: {
        diagnostico: '',
        fecha: null,
        nombreClinico: ''
      }
    }
  };

  constructor() { }

  saveToDatabase() {
    // Llamada a un servicio para guardar en la base de datos.
    // this.yourService.saveAnamnesis(this.anamnesis).subscribe(response => {
    //   // Acciones a realizar después de guardar en la base de datos.
    // });
  }
}
