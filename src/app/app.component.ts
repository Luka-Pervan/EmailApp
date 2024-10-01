import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Declare this component as standalone
  imports: [RouterModule], // Import RouterModule for routing
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Email app</h1>
        <nav>
          <a routerLink="/email-form" class="nav-link">Email Form</a> |
          <a routerLink="/email-history" class="nav-link">Email History</a>
        </nav>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>&copy; 2024 Email App. All rights reserved.</p>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
