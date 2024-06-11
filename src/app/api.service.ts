import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}s`);
  }

  getUser(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${id}`);
  }

  addUser(user: any): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiUrl}`, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<User[]>(`${this.apiUrl}/edit/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
