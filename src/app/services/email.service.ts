import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailData } from '../models/email.model'; // Adjust the path accordingly
import { EmailResponse } from '../models/email-response.model';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'https://localhost:7132/api/Email'; // Adjust the API URL as needed

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailData): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, emailData);
  }

  getEmailHistory(): Observable<EmailResponse[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history`);
  }
}
