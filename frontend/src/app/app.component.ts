import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  candidatesForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    otherData: new FormControl('')
  })

  onFileSelected(event: any) {
    console.log(event)
  }

  onSubmit() {

  }
}
