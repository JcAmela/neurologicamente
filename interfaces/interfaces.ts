export class User {
  email: string;
  password: string;
  confirmPassword: string;
  id: string;

  constructor(email: string = '', password: string = '', confirmPassword: string = '', id:string = '') {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.id = id;

  }

  // Método para convertir la instancia a un objeto simple
  toObject(): object {
      return {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          id: this.id
      };
  }
}
  
export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url?: string;  
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Source {
  id?: string;
  name: string;
}


export default interface Patient {
  id: string;
  datosPersonales?: DatosPersonales;
  anamnesis?: Anamnesis;
  informe?: string;
  fechaActual?: string; 
}

export interface Anamnesis {
  motivoConsulta: string;
  historiaClinicaBiopsicosocial: string;
  antecedentesMedicos:string,
  estadoActual: EstadoActual;
  antecedentesFamiliares:string,
}

export interface EstadoActual {
  esferaSocial: string;
  esferaCognitiva: string;
  esferaPsicologica: string;
  otraInformacion: string;
  nuevoDiagnostico: NuevoDiagnostico;
}

export interface NuevoDiagnostico {
  diagnostico: string;
  fecha: Date | null;
  nombreClinico: string;
}


export interface DatosPersonales {
  nombre: string;
  apellidos:string;
  fechaNacimiento: Date; 
  sexoBiologico: string;
  direccion: string;
  telefono: string;
  fechaActual: string;
}

export interface Diagnostico {
  nombreDiagnostico: string;
  fecha: Date | null;
  nombreClinico: string;
}

export interface Test {
  id?: string; 
  fecha: Date; 
  areasEvaluadasTest: string[];
  funciones: Funcion[];
}

export interface Funcion {
  dominioEvaluar: string;
  instrumento: string;
  puntuacionZ: number;
}
