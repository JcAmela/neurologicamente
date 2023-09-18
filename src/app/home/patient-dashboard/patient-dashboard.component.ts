import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  activeComponent: string = 'profile'; 

  constructor() {}

  ngOnInit(): void {}

  showComponent(componentName: string): void {
    this.activeComponent = componentName;
  }
}
