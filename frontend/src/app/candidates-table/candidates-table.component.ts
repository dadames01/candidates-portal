import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
interface Candidates {
  name: string;
  surname: string;
  seniority: string;
  years: number;
  availiability: boolean;
}

@Component({
  selector: 'candidates-table',
  imports: [MatTableModule],
  templateUrl: './candidates-table.component.html',
  styleUrl: './candidates-table.component.css'
})
export class CandidatesTableComponent {
  @Input() candidates: Candidates[] = [];

  displayedColumns = ['name', 'surname', 'seniority', 'years', 'availability']
}
