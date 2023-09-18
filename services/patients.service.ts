import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Patient from 'interfaces/interfaces';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private auth = getAuth();

  constructor(private firestore: Firestore) {}

  // Obtener todos los pacientes del usuario (psicólogo) actual
  getPatientsOfCurrentUser(): Observable<Patient[]> {
    return from(this._getPatientsOfCurrentUser());
  }

  // Añadir un nuevo paciente
  addPatient(patientData: Patient): Observable<void> {
    return new Observable<void>((observer) => {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                const psicologoUID = user.uid;
                addDoc(collection(this.firestore, `users/${psicologoUID}/patients`), patientData).then(() => {
                    observer.next();
                    observer.complete();
                }).catch((error) => {
                    observer.error(error);
                });
            } else {
                observer.error(new Error('No hay un usuario autenticado.'));
            }
        });
    });
  }

  // Modificar un paciente por su ID
  updatePatient(patientId: string, updatedData: any): Observable<void> {
    return from(this._updatePatient(patientId, updatedData));
  }

  // Eliminar un paciente por su ID
  deletePatient(patientId: string): Observable<void> {
    return from(this._deletePatient(patientId));
  }

  // Obtener un paciente específico por su ID
  getPatientById(patientId: string): Observable<Patient> {
    return from(this._getPatientById(patientId));
  }

  private async _getPatientsOfCurrentUser(): Promise<Patient[]> {
    return new Promise<Patient[]>((resolve, reject) => {
        onAuthStateChanged(this.auth, async (user) => {
            if (user) {
                const psicologoUID = user.uid;
                const q = query(collection(this.firestore, `users/${psicologoUID}/patients`));
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

  private async _updatePatient(patientId: string, updatedData: any): Promise<void> {
    const user = getAuth().currentUser;
    if (user) {
      const psicologoUID = user.uid;
      await updateDoc(doc(this.firestore, `users/${psicologoUID}/patients`, patientId), updatedData);
    } else {
      throw new Error('No hay un usuario autenticado.');
    }
  }

  private async _deletePatient(patientId: string): Promise<void> {
    const user = getAuth().currentUser;
    if (user) {
      const psicologoUID = user.uid;
      await deleteDoc(doc(this.firestore, `users/${psicologoUID}/patients`, patientId));
    } else {
      throw new Error('No hay un usuario autenticado.');
    }
  }

  private async _getPatientById(patientId: string): Promise<Patient> {
    const user = getAuth().currentUser;
    if (user) {
      const psicologoUID = user.uid;
      const patientRef = doc(this.firestore, `users/${psicologoUID}/patients`, patientId);
      const documentSnapshot = await getDoc(patientRef);
      if (documentSnapshot.exists()) {
        return documentSnapshot.data() as Patient;
      } else {
        throw new Error('Paciente no encontrado');
      }
    } else {
      throw new Error('No hay un usuario autenticado.');
    }
  }
}
