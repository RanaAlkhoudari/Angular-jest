import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/userInterface';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent implements OnInit {
  userData: User;
  message: any;
  errorMessage: any;
  user: User[] = [];
  url: string;
  updatedUser: any;
  subscription: Subscription;
  fixture: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private zone: NgZone
  ) {
    this.subscription = this.userService.nameData$.subscribe((data) => {
      this.userData = data;
      this.updatedUser = data;
    });
  }

  ngOnInit(): void {
    this.url = this.userData[0]
      ? `http://localhost:3000/user/${this.userData[0]._id}`
      : this.updatedUser._id
      ? `http://localhost:3000/user/${this.updatedUser._id}`
      : '';
    if (this.url !== '') { 
      this.apiService.getUser(this.url.slice(27)).subscribe({
        next: (res: User[]) => {
          this.user = res;
          this.userService.setData(this.user);
        },
        error: (err) => (this.message = err)
        
      });
    }
  }

  deleteUser(): void {
    this.apiService.deleteUser(this.user[0]._id).subscribe({
      next: (res) => (this.message = res),
      error: (err) => (this.errorMessage = err.error),
    });
  }

  editUser(): void {
    this.zone.run(() => {
      this.router.navigateByUrl('edit');
    });
  }
}
