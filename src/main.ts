// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EmailFormComponent } from './app/components/email-form/email-form.component';
import { EmailHistoryComponent } from './app/components/email-history/email-history.component';

const routes: Routes = [
  { path: 'email-form', component: EmailFormComponent },
  { path: 'email-history', component: EmailHistoryComponent },
  { path: '', redirectTo: '/email-form', pathMatch: 'full' },
  { path: '**', redirectTo: '/email-form' }, // Catch-all route
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right', // Position of the toast notifications
        preventDuplicates: true, // Prevent duplicate notifications
        timeOut: 3000, // Auto close after 3 seconds
        closeButton: true, // Show close button
        progressBar: true, // Show progress bar
      })
    ),
  ],
}).catch((err) => console.error(err));
