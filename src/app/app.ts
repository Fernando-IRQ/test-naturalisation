import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiChoiceTestComponent } from './multi-choice-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MultiChoiceTestComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('test-naturalization');

  // UI state: 'start' shows the choice screen, 'test' shows the quiz
  mode: 'start' | 'test' = 'start';
  selectedMaxQuestions: number | null = null;

  // pills used in the app.html placeholder
  pills = [
    { title: 'Angular Docs', link: 'https://angular.io' },
    { title: 'GitHub', link: 'https://github.com' },
    { title: 'Angular Blog', link: 'https://blog.angular.io' }
  ];

  trackByTitle(_index: number, item: { title: string }) {
    return item.title;
  }

  startQuick() {
    this.selectedMaxQuestions = 10;
    this.mode = 'test';
  }

  startFull() {
    this.selectedMaxQuestions = null;
    this.mode = 'test';
  }

  backToStart() {
    this.mode = 'start';
    this.selectedMaxQuestions = null;
  }
}
