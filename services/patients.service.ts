import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore, collection, addDoc, query, getDocs, doc, getDoc, limit, orderBy,updateDoc } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Patient from 'interfaces/interfaces';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private auth = getAuth();

  constructor(private firestore: Firestore) {}

  // Método para verificar la autenticación
  private checkAuthentication(): void {
    if (!this.auth.currentUser) {
      throw new Error('No hay un usuario autenticado.');
    }
  }

  // Obtener todos los pacientes del usuario (psicólogo) actual
  getPatientsOfCurrentUser(): Observable<Patient[]> {
    return from(this._getPatientsOfCurrentUser());
  }


// Añadir un nuevo paciente
addPatient(patientData: Patient): Observable<string> {
  return new Observable<string>((observer) => {
      this.checkAuthentication();
      const user = this.auth.currentUser;
      const psicologoUID = user!.uid;
      addDoc(collection(this.firestore, `users/${psicologoUID}/patients`), {})
          .then((docRef) => {
              console.log('Documento paciente creado con ID: ', docRef.id);
              const patientId = docRef.id;

              // Llamar a savePersonalData para guardar los datos personales del paciente
              this.savePersonalData(patientData, patientId)
                  .subscribe(
                      () => {
                          observer.next(patientId);
                          observer.complete();
                      },
                      (error) => {
                          console.error('Error guardando datos personales: ', error);
                          observer.error(error);
                      }
                  );
          })
          .catch((error) => {
              console.error('Error añadiendo documento a pacientes: ', error);
              observer.error(error);
          });
  });
}


  

  // Método para obtener los últimos 10 pacientes registrados del usuario actual (devuelve una Promise).
  private async _getPatientsOfCurrentUser(): Promise<Patient[]> {
    return new Promise<Patient[]>((resolve, reject) => {
      this.checkAuthentication();
      onAuthStateChanged(this.auth, async (user) => {
        if (user) {
          const psicologoUID = user.uid;
          const q = query(
            collection(this.firestore, `users/${psicologoUID}/patients`),
            orderBy('registeredDate', 'desc'), // Asume que hay un campo 'registeredDate' en cada documento
            limit(10)
          );
          try {
            const querySnapshot = await getDocs(q);
            const patients: Patient[] = querySnapshot.docs.map(doc => doc.data() as Patient);
            resolve(patients);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error('No hay un usuario autenticado.'));
        }
      });
    });
  }

// Método para obtener un paciente específico por ID.
  private async _getPatientById(patientId: string): Promise<Patient> {
    this.checkAuthentication();
    const user = this.auth.currentUser;
    const psicologoUID = user!.uid;
    const patientRef = doc(this.firestore, `users/${psicologoUID}/patients`, patientId);
    const documentSnapshot = await getDoc(patientRef);
    if (documentSnapshot.exists()) {
      return documentSnapshot.data() as Patient;
    } else {
      throw new Error('Paciente no encontrado');
    }
  }



// Método para guardar datos personales
savePersonalData(data: any, patientId: string): Observable<void> {
  return new Observable<void>((observer) => {
    this.checkAuthentication();
    const user = this.auth.currentUser;
    const psicologoUID = user!.uid;
    // Referencia a un documento específico en la sub-colección 'datos personales' del paciente específico
    const datosPersonalesDocRef = doc(this.firestore, `users/${psicologoUID}/patients/${patientId}/datosPersonales/data`);

    setDoc(datosPersonalesDocRef, data)  
      .then(() => {
        observer.next();
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}


// Método para guardar anamnesis
saveAnamnesis(data: any, patientId: string): Observable<void> {
  return new Observable<void>((observer) => {
    this.checkAuthentication();
    const user = this.auth.currentUser;
    const psicologoUID = user!.uid;
    const anamnesisCollectionRef = collection(this.firestore, `users/${psicologoUID}/patients/${patientId}/anamnesis`);

    addDoc(anamnesisCollectionRef, data) 
      .then(() => {
        observer.next();
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}











}
