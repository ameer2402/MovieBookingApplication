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
    
    // Check if the request explicitly wants to bypass the global loader (e.g. initial skeleton load)
    if (request.headers.has('X-Skip-Loader')) {
      const headers = request.headers.delete('X-Skip-Loader');
      const modifiedRequest = request.clone({ headers });
      return next.handle(modifiedRequest);
    }

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
