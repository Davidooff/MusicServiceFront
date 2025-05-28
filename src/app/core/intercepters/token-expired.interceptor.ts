// src/app/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, mergeMap, retry } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Do not intercept token refresh requests to avoid infinite loops
    if (request.url.includes('/api/auth')) {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
              mergeMap((token) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token);
                return next.handle(request);
              }),
              catchError((err) => {
                this.isRefreshing = false;
                return throwError(() => err);
              })
            );
          }

          while (this.isRefreshing) {}
          return this.refreshTokenSubject.pipe(
            mergeMap((token) => {
              return token ? next.handle(request) : throwError(() => error);
            })
          );
        }
        // For other errors, just propagate them
        return throwError(() => error);
      })
    );
  }
}
