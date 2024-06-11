import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private nameDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  nameData$ = this.nameDataSubject.asObservable();

  setData(user: User[]) {
    this.nameDataSubject.next(user);
  }
}
