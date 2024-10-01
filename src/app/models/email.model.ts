// src/app/models/email.model.ts
export interface EmailData {
  fromEmail: string;
  toEmail: string;
  ccEmails?: string; // Optional field
  subject: string;
  content: string;
  importance: number; // Adjust as needed
}
