import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  constructor() {}

  show(type: 'success' | 'error' | 'info' | 'warning', title: string, message: string, duration: number = 4000) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, type, title, message };
    
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next([...currentToasts, newToast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  showSuccess(title: string, message: string) {
    this.show('success', title, message);
  }

  showError(title: string, message: string) {
    this.show('error', title, message, 5000);
  }

  showInfo(title: string, message: string) {
    this.show('info', title, message);
  }

  showWarning(title: string, message: string) {
    this.show('warning', title, message);
  }

  remove(id: string) {
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }
}
