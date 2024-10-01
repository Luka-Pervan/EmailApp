// src/app/models/email-response.model.ts
export interface EmailResponse {
  fromEmail: string;
  toEmail: string;
  ccEmails?: string;
  subject: string;
  content: string;
  importance: string; // Kept as string for readability
  dateSent: Date;
}
