import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let context = 'DEFAULT';
    const url = request.url.toLowerCase();

    if (url.includes('/login') || url.includes('/register') || url.includes('/authenticate')) {
      context = 'AUTH';
    } else if (url.includes('/api/movie')) {
      context = 'MOVIE';
    } else if (url.includes('/api/booking')) {
      context = 'TICKET';
    }

    this.loaderService.show(context);

    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
