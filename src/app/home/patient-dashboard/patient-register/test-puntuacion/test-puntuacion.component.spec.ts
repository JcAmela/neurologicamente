import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPuntuacionComponent } from './test-puntuacion.component';

describe('TestPuntuacionComponent', () => {
  let component: TestPuntuacionComponent;
  let fixture: ComponentFixture<TestPuntuacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestPuntuacionComponent]
    });
    fixture = TestBed.createComponent(TestPuntuacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
