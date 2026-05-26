import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject<boolean>(false);
  public context = new BehaviorSubject<string>('DEFAULT');
  private requestCount = 0;

  constructor() {}

  show(ctx: string = 'DEFAULT') {
    this.requestCount++;
    this.context.next(ctx);
    this.isLoading.next(true);
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.isLoading.next(false);
      this.context.next('DEFAULT');
    }
  }
}
