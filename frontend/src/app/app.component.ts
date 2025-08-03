import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CandidatesApiService } from './candidates-api.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private apiService: CandidatesApiService) { }

  candidatesForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
  })

  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(f: any) {
    if (this.candidatesForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.candidatesForm.value.name!);
      formData.append('surname', this.candidatesForm.value.surname!);
      formData.append('file', this.selectedFile);
      this.apiService.postData(formData).subscribe({
        next: () => {
          f.resetForm();
          this.selectedFile = null;
          const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
          if (fileInput) {
            fileInput.value = '';
          }
        },
        error: (err) => console.error('POST error:', err)
      });
    }
  }
}
