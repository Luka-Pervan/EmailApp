import { Component, Inject } from '@angular/core';
import { EmailResponse } from '../../models/email-response.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="email-detail">
      <h2>Email Details</h2>
      <p><strong>From:</strong> {{ data.fromEmail }}</p>
      <p><strong>To:</strong> {{ data.toEmail }}</p>
      <p><strong>CC:</strong> {{ data.ccEmails }}</p>
      <p><strong>Subject:</strong> {{ data.subject }}</p>
      <p><strong>Importance:</strong> {{ data.importance }}</p>
      <p>
        <strong>Date Sent:</strong>
        {{ data.dateSent | date : 'dd.MM.yyyy. HH:mm' }}
      </p>
      <p><strong>Content:</strong></p>
      <p class="email-content">{{ data.content }}</p>
      <button (click)="close()" class="close-button">Close</button>
    </div>
  `,
  styles: [
    `
      .email-detail {
        width: 400px; /* Set a fixed width for the detail modal */
        padding: 20px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow for depth */
        font-family: 'Arial', sans-serif; /* Consistent font for better readability */
      }
      .email-detail h2 {
        margin-top: 0;
        color: #333; /* Darker color for the title */
      }
      .email-detail p {
        margin: 10px 0; /* Add margin for spacing */
        color: #555; /* Darker gray for content */
      }
      .email-detail p strong {
        color: #007bff; /* Primary color for labels */
      }
      .email-content {
        white-space: pre-line; /* Preserve line breaks in content */
        color: #666; /* Slightly lighter color for content */
      }
      .content-box {
        margin-bottom: 15px; /* Space below the content box */
        padding: 15px; /* Padding inside the box */
        background: #e3f2fd; /* Light blue background for content */
        border: 1px solid #90caf9; /* Light blue border */
        border-radius: 6px; /* Rounded corners for the box */
      }
      .close-button {
        margin-top: 20px; /* Space above the button */
        padding: 10px 15px;
        background-color: #007bff; /* Primary color */
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 16px; /* Modern font size */
      }
      .close-button:hover {
        background-color: #0056b3; /* Darker shade on hover */
      }
    `,
  ],
})
export class EmailDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmailResponse, // Inject the data
    private dialogRef: MatDialogRef<EmailDetailComponent>
  ) {}

  close() {
    this.dialogRef.close(); // Close the dialog
  }
}
