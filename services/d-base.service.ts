import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import Patient from 'interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DBaseService {
  private auth: Auth = inject(Auth);

  constructor(private firestore: Firestore) {}

  async addUid(patients: Patient): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const user = this.auth.currentUser; 
      
      if (user) {
        const patientsRef = collection(this.firestore, 'patients');
        
       
        try {
          await addDoc(patientsRef, { id: user.uid }); // Añadimos solo el uid del usuario a Firestore
          resolve();
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error('No hay un usuario autenticado.'));
      }
    });
  }
}
