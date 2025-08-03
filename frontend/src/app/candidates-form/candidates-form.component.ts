import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'candidates-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './candidates-form.component.html',
  styleUrl: './candidates-form.component.css'
})
export class CandidatesFormComponent {
  @Output() formSubmitted = new EventEmitter<{ formData: FormData, f: any }>();

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

      this.formSubmitted.emit({ formData, f });
    }
  }

  resetForm(f: any) {
    f.resetForm();
    this.selectedFile = null;

    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  }

}
