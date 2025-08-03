import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CandidatesApiService } from './candidates-api.service';
import { MatTableModule } from '@angular/material/table';
import { CandidatesFormComponent } from "./candidates-form/candidates-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CandidatesFormComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule, CandidatesFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private apiService: CandidatesApiService) { }
  @ViewChild('candidatesForm') candidatesFormComponent!: CandidatesFormComponent;

  displayedColumns = ['name', 'surname', 'seniority', 'years', 'availability']
  dataSource = signal<any[]>(this.loadCandidatesData());

  handleCandidatesFormSubmit(formData: FormData, f: any) {
    this.apiService.postData(formData).subscribe({
      next: (res) => {
        console.log('API success:', res);
        this.candidatesFormComponent.resetForm(f);
        this.dataSource.set([...this.dataSource(), res])
        this.saveCandidatesData(this.dataSource());
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }

  private loadCandidatesData(): any[] {
    const saved = localStorage.getItem('candidates');
    return saved ? JSON.parse(saved) : [];
  }

  private saveCandidatesData(responses: any[]) {
    localStorage.setItem('candidates', JSON.stringify(responses));
  }
}
