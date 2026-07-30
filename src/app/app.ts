import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiChoiceTestComponent } from './multi-choice-test.component';
import { GeographyExplorerComponent } from './geography-explorer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MultiChoiceTestComponent, GeographyExplorerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('test-naturalization');

  // UI state: 'start' shows the choice screen, 'test' shows the quiz, 'geo' shows the map
  mode: 'start' | 'test' | 'geo' = 'start';
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

  startGeography() {
    this.mode = 'geo';
  }

  backToStart() {
    this.mode = 'start';
    this.selectedMaxQuestions = null;
  }

  /**
   * Show a simple browser alert with the disclaimer text.
   * Using a native alert keeps the UI free of extra dialog markup.
   */
  showDisclaimer() {
    const title = 'Note — usage et sources';
    const msg = `Cet outil sert à réviser pour l'examen civique.\n\n` +
      `Questions : Le référentiel de connaissances de l'arrêté du 10 octobre 2025. \n\nRéponses : extraites du référentiel ou complétées automatiquement par IA. ` +
      `\n\nCe test est un outil d'entraînement ; vérifiez toujours les informations auprès des ressources officielles si besoin.`;
    this.showCustomModal(title, msg);
  }

  // Create a simple programmatic modal (appended to body) so we can control the title
  // without adding permanent markup to the template.
  private showCustomModal(title: string, message: string) {
    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'presentation');
    overlay.style.cssText = `position:fixed;inset:0;display:flex;align-items:center;justify-content:center;` +
      `background:rgba(2,6,23,0.45);z-index:2147483646;`;

    const dialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.style.cssText = `max-width:680px;min-width:280px;background:#fff;color:#07121a;padding:18px;border-radius:10px;` +
      `box-shadow:0 18px 50px rgba(2,6,23,0.4);font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial;`;

    const h = document.createElement('div');
    h.style.cssText = 'font-weight:800;margin-bottom:8px;font-size:1rem';
    h.textContent = title;

    const p = document.createElement('div');
    p.style.cssText = 'font-size:0.95rem;line-height:1.3;white-space:pre-wrap;color:#0f172a';
    p.textContent = message;

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;justify-content:flex-end;margin-top:12px;gap:8px;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Fermer';
    closeBtn.style.cssText = `background:#0b7285;color:#fff;border:0;padding:8px 10px;border-radius:8px;cursor:pointer;font-weight:700`;
    closeBtn.addEventListener('click', remove);

    actions.appendChild(closeBtn);
    dialog.appendChild(h);
    dialog.appendChild(p);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // focus management
    const previousActive = document.activeElement as HTMLElement | null;
    closeBtn.focus();

    function remove() {
      try { overlay.remove(); } catch (e) { /* ignore */ }
      if (previousActive && typeof previousActive.focus === 'function') previousActive.focus();
      window.removeEventListener('keydown', onKey);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') remove();
    }

    // close on ESC
    window.addEventListener('keydown', onKey);
    // also close when clicking outside the dialog
    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay) remove();
    });
  }
}
