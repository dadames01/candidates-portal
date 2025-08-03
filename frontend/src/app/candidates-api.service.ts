import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesApiService {
  private apiUrl = 'http://localhost:3000/candidates';
  constructor(private http: HttpClient) { }

  postData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
