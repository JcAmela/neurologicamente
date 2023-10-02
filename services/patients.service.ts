import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from "@angular/fire/auth";
import Patient from 'interfaces/interfaces';
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  private checkAuthentication(): void {
    if (!this.auth.currentUser) {
      throw new Error('No hay un usuario autenticado.');
    }
  }

  getPatientsOfCurrentUser(): Observable<Patient[]> {
    return from(this._getPatientsOfCurrentUser());
  }

  addPatient(patientData: Patient): Observable<string> {
    return new Observable<string>((observer) => {
        this.checkAuthentication();
        const user = this.auth.currentUser;
        const psicologoUID = user!.uid;
        const collRef = collection(this.firestore, `users/${psicologoUID}/patients`);
        addDoc(collRef, {})
            .then((docRef) => {
                console.log('Documento paciente creado con ID: ', docRef.id);
                const patientId = docRef.id;
                this.savePersonalData(patientData, patientId)
                    .subscribe(
                        () => {
                            observer.next(patientId);
                            observer.complete();
                        },
                        error => {
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

  private async _getPatientsOfCurrentUser(): Promise<Patient[]> {
    return new Promise<Patient[]>((resolve, reject) => {
      this.checkAuthentication();
      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          const psicologoUID = user.uid;
          const collRef = collection(this.firestore, `users/${psicologoUID}/patients`);
          const q = query(collRef, orderBy('registeredDate', 'desc'), limit(10));
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

  private async _getPatientById(patientId: string): Promise<Patient> {
    this.checkAuthentication();
    const user = this.auth.currentUser;
    const psicologoUID = user!.uid;
    const patientRef = doc(this.firestore, `users/${psicologoUID}/patients/${patientId}`);
    const documentSnapshot = await getDoc(patientRef);
    if (documentSnapshot.exists()) {
      return documentSnapshot.data() as Patient;
    } else {
      throw new Error('Paciente no encontrado');
    }
  }

  savePersonalData(data: any, patientId: string): Observable<void> {
    return new Observable<void>((observer) => {
      try {
        this.checkAuthentication();
        const user = this.auth.currentUser;
        const psicologoUID = user!.uid;
        const datosPersonalesDocRef = doc(this.firestore, `users/${psicologoUID}/patients/${patientId}/datosPersonales/data`);
        setDoc(datosPersonalesDocRef, data)
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      } catch (error) {
        observer.error(error);
      }
    });
  }

  saveAnamnesis(data: any, patientId: string): Observable<void> {
    return new Observable<void>((observer) => {
      try {
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
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
