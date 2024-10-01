import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { EmailData } from '../../models/email.model';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent {
  emailForm: FormGroup;

  private importanceMap: { [key: string]: number } = {
    Low: 1,
    Normal: 2,
    High: 3,
  };

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private toastr: ToastrService
  ) {
    this.emailForm = this.fb.group({
      fromEmail: ['', [Validators.required, Validators.email]],
      toEmail: ['', [Validators.required, Validators.email]],
      ccEmails: [''],
      subject: ['', Validators.required],
      content: ['', Validators.required],
      importance: ['Normal', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      const formValue = this.emailForm.value;
      const emailData: EmailData = {
        ...formValue,
        importance: this.importanceMap[formValue.importance], // Convert to number
      };

      this.emailService.sendEmail(emailData).subscribe({
        next: (response) => {
          // Show success toast at the bottom right
          this.toastr.success('Email sent successfully', '', {
            positionClass: 'toast-bottom-right', // Position the toast
            timeOut: 3000, // Optional: Automatically dismiss after 3 seconds
          });
          this.emailForm.reset(); // Reset the form after submission
        },
        error: (err) =>
          this.toastr.error(err.message, '', {
            positionClass: 'toast-bottom-right',
            timeOut: 3000,
          }),
      });
    } else {
      this.toastr.error(
        'Please fill all required fields with valid data.',
        '',
        {
          positionClass: 'toast-bottom-right',
          timeOut: 3000,
        }
      );
    }
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel?')) {
      this.emailForm.reset();
    }
  }
}
