import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject<boolean>(false);
  public context = new BehaviorSubject<string>('DEFAULT');
  private requestCount = 0;
  private timeoutId: any;

  constructor() {}

  show(ctx: string = 'DEFAULT') {
    this.requestCount++;
    this.context.next(ctx);
    if (this.requestCount === 1) {
      this.timeoutId = setTimeout(() => {
        this.isLoading.next(true);
      }, 300); // 300ms delay to prevent redundant flashing
    }
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      clearTimeout(this.timeoutId);
      this.isLoading.next(false);
      this.context.next('DEFAULT');
    }
  }
}
