import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Category } from './interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Category[]>{
    return this.db.list<Category>('/categories').snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => (
          {
          key: c.payload.key,
          ...c.payload.val()
          } as Category))
      )
    );
  }
}
