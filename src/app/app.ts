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

  // pills used in the app.html placeholder
  pills = [
    { title: 'Angular Docs', link: 'https://angular.io' },
    { title: 'GitHub', link: 'https://github.com' },
    { title: 'Angular Blog', link: 'https://blog.angular.io' }
  ];

  trackByTitle(_index: number, item: { title: string }) {
    return item.title;
  }
}
