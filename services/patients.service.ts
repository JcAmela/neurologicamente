import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError, toArray } from 'rxjs/operators';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from "@angular/fire/auth";
import Patient from 'interfaces/interfaces';
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private dataService: DataService  // Inyecta DataService
  ) { }

  private checkAuthentication(): Observable<void> {
    return new Observable<void>(observer => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          observer.next();
          observer.complete();
        } else {
          observer.error(new Error('No hay un usuario autenticado.'));
        }
      });
    });
  }

  addPatient(patientData: Patient): Observable<string> {
    return this.checkAuthentication().pipe(
      switchMap(() => {
        const user = this.auth.currentUser;
        const psicologoUID = user!.uid;
        const collRef = collection(this.firestore, `users/${psicologoUID}/patients`);
        return from(addDoc(collRef, {})).pipe(
          switchMap(docRef => {
            console.log('Documento paciente creado con ID: ', docRef.id);
            const patientId = docRef.id;
            return this.savePersonalData(patientData, patientId).pipe(
              map(() => patientId)
            );
          })
        );
      }),
      catchError(error => {
        console.error('Error añadiendo documento a pacientes: ', error);
        return throwError(error);
      })
    );
  }

  getPatientsOfCurrentUser(): Observable<Patient[]> {
    return this.checkAuthentication().pipe(
      switchMap(() => {
        const user = this.auth.currentUser!;
        console.log('Usuario actual:', user);
        const collRef = collection(this.firestore, `users/${user.uid}/patients/`);
        const q = query(collRef, orderBy('registeredDate', 'desc'), limit(10));
        return from(getDocs(q)).pipe(
          map(querySnapshot => {
            console.log('Snapshot de la consulta:', querySnapshot);
            const patients = querySnapshot.docs.map(doc => {
              console.log('Documento:', doc.data());
              const data = doc.data();
              return { id: doc.id, ...data } as Patient;
            });
            console.log('Pacientes:', patients);
            return patients;
          })
        );
      })
    );
  }

  

  private getPatientById(patientId: string): Observable<Patient> {
    return this.checkAuthentication().pipe(
      switchMap(() => {
        const user = this.auth.currentUser;
        const psicologoUID = user!.uid;
        const patientRef = doc(this.firestore, `users/${psicologoUID}/patients/${patientId}`);
        return from(getDoc(patientRef)).pipe(
          map(documentSnapshot => {
            if (documentSnapshot.exists()) {
              return documentSnapshot.data() as Patient;
            } else {
              throw new Error('Paciente no encontrado');
            }
          })
        );
      })
    );
  }

  savePersonalData(data: any, patientId: string): Observable<void> {
    return this.checkAuthentication().pipe(
        switchMap(() => {
            if (data === null || typeof data !== 'object') {
                throw new Error('Datos inválidos: data debe ser un objeto no-nulo.');
            }
            const user = this.auth.currentUser;
            const psicologoUID = user!.uid;
            const datosPersonalesDocRef = doc(this.firestore, `users/${psicologoUID}/patients/${patientId}/datosPersonales/${patientId}`);
            data.registeredDate = this.dataService.getToday();
            return from(setDoc(datosPersonalesDocRef, data)).pipe(
                map(() => { })  
            );
        }),
        catchError(error => {
            console.error('Error guardando datos personales:', error);
            return throwError(error);
        })
    );
}




saveAnamnesis(data: any, patientId: string): Observable<void> {
    return this.checkAuthentication().pipe(
      switchMap(() => {
        if (data === null || typeof data !== 'object') {
          throw new Error('Datos inválidos: data debe ser un objeto no-nulo.');
        }
        const user = this.auth.currentUser;
        const psicologoUID = user!.uid;
        const anamnesisCollectionRef = collection(this.firestore, `users/${psicologoUID}/patients/${patientId}/anamnesis`);
        return from(addDoc(anamnesisCollectionRef, data)).pipe(
          map(() => { })  
        );
      }),
      catchError(error => {
        console.error('Error guardando anamnesis:', error);
        return throwError(error);
      })
    );
}

}