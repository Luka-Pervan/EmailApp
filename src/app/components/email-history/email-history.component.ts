import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { EmailResponse } from '../../models/email-response.model';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-email-history',
  standalone: true, // Standalone component
  imports: [CommonModule, MatListModule],
  templateUrl: './email-history.component.html',
  styleUrls: ['./email-history.component.css'],
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class EmailHistoryComponent implements OnInit {
  emails: EmailResponse[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private emailService: EmailService,
    private toastr: ToastrService
  ) {} // Inject ToastrService

  ngOnInit(): void {
    this.emailService.getEmailHistory().subscribe(
      (data) => {
        this.emails = data;
        this.loading = false;
        this.toastr.success('Email history loaded successfully'); // Success toast
      },
      (error) => {
        console.error('Error fetching email history', error);
        this.error = 'Failed to load email history';
        this.loading = false;
        this.toastr.error('Failed to load email history'); // Error toast
      }
    );
  }
}
