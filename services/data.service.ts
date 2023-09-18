import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  // Función para obtener la fecha de hoy
  getToday(): string {
    return this.formatDate(new Date());
  }

  // Función para obtener la fecha de ayer
  getYesterday(): string {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return this.formatDate(date);
  }

  // Función para formatear la fecha a YYYY-MM-DD
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
  getAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }
  
}
