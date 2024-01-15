import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AppUser } from './interfaces/app-user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) { }

  save(user: any) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object('/users/' + uid).valueChanges() as Observable<AppUser>;
  }
}
