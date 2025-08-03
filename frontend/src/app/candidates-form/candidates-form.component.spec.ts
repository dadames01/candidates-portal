import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesFormComponent } from './candidates-form.component';

describe('CandidatesFormComponent', () => {
  let component: CandidatesFormComponent;
  let fixture: ComponentFixture<CandidatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
