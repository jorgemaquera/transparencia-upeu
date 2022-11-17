import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { LoginData } from '../helpers/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  authenticate() {
    return authState(this.auth).pipe(
      map(auth => {
        if (auth != null) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
