import { Component, NgZone, OnInit } from '@angular/core';
import { User } from '../../interfaces/userInterface';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  users: User[];
  user: User[];
  message: {};
  errorMessage: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (res: User[]) => (this.users = res),
      error: (err) => (this.errorMessage = err.error),
    });
  }

  deleteUser(id: string): void {
    this.apiService.deleteUser(id).subscribe({
      next: (res) => {
        this.message = res;
        this.ngOnInit();
      },
      error: (err) => (this.errorMessage = err.error),
    });
  }

  getUser(id: string, url: string) {
    this.apiService.getUser(id).subscribe({
      next: (res: User[]) => {
        this.user = res;
        this.userService.setData(this.user);
        this.zone.run(() => {
          this.router.navigateByUrl(url);
        });
      },
      error: (err) => (this.errorMessage = err.error),
    });
  }

  editUser(id: string): void {
    this.getUser(id, 'edit');
  }

  navigateToMayAccount(id: string): void {
    this.getUser(id, 'myAccount');
  }
}
