import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { EmailResponse } from '../../models/email-response.model';
import { ToastrService } from 'ngx-toastr';
import { EmailDetailComponent } from '../email-detail/email-detail.component';
import { MatDialog } from '@angular/material/dialog';

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
  sortOrder: 'asc' | 'desc' = 'desc'; // Default sort order

  constructor(
    private emailService: EmailService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.emailService.getEmailHistory().subscribe(
      (data) => {
        this.emails = data;
        this.loading = false;
        this.toastr.success('Email history loaded successfully'); // Success toast
        this.sortEmails(); // Sort emails initially
      },
      (error) => {
        console.error('Error fetching email history', error);
        this.error = 'Failed to load email history';
        this.loading = false;
        this.toastr.error('Failed to load email history'); // Error toast
      }
    );
  }
  openDetails(email: EmailResponse): void {
    const dialogRef = this.dialog.open(EmailDetailComponent, {
      data: email,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  // Method to sort emails by date
  sortEmails() {
    this.emails.sort((a, b) => {
      const dateA = new Date(a.dateSent).getTime();
      const dateB = new Date(b.dateSent).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  // Method to toggle sort order
  toggleSort() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortEmails(); // Re-sort emails after changing the order
  }
}
