import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CandidatesApiService } from './candidates-api.service';
import { CandidatesFormComponent } from "./candidates-form/candidates-form.component";
import { CandidatesTableComponent } from "./candidates-table/candidates-table.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CandidatesFormComponent, CandidatesTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private apiService: CandidatesApiService) { }
  @ViewChild('candidatesForm') candidatesFormComponent!: CandidatesFormComponent;

  candidatesData = signal<any[]>(this.loadCandidatesData());

  handleCandidatesFormSubmit(formData: FormData, f: any) {
    this.apiService.postData(formData).subscribe({
      next: (res) => {
        this.candidatesFormComponent.resetForm(f);
        this.candidatesData.set([...this.candidatesData(), res])
        this.saveCandidatesData(this.candidatesData());
      },
      error: (err) => {
        console.error('API error:', err);
        window.alert('There was an error while uploading the candidate\'s data')
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
