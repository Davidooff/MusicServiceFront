import { HttpClient } from '@angular/common/http';
import { inject, Injectable, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

enum AuthStatus {
  LoggedIn,
  LoggedOut,
}

type AuthResponse = {
  title: string;
  detail: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  login(
    email: string,
    password: string,
    serverMsg: WritableSignal<AuthResponse | null>
  ) {
    this.http.post('/api/auth/login', { email, password }).subscribe({
      complete: () => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        serverMsg.set({
          title: err.error.title,
          detail: err.error.detail,
        });
      },
    });
  }

  register(
    username: string,
    email: string,
    password: string,
    serverMsg: WritableSignal<AuthResponse | null>
  ) {
    this.http
      .post('/api/auth/register', { username, email, password })
      .subscribe({
        complete: () => {
          this.router.navigate(['/verify']);
        },
        error: (err: any) => {
          serverMsg.set({
            title: err.error.title,
            detail: err.error.detail,
          });
        },
      });
  }

  verifyEmail(code: string, serverMsg: WritableSignal<AuthResponse | null>) {
    this.http.post('/api/auth/verify-email', { code }).subscribe({
      complete: () => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        if (err.status === 404) {
          serverMsg.set({
            title: 'User not found',
            detail:
              'Time expired or u axieded amount of requests. Please try to register, again.',
          });
          return;
        }
        serverMsg.set({
          title: err.error.title,
          detail: err.error.detail,
        });
      },
    });
  }
}
