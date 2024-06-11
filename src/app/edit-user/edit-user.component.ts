import { Component, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../../interfaces/userInterface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  formEdit: FormGroup = null;
  user: User[] = [];
  professionsList: any = ['lawyer', 'architect', 'doctor', 'other'];
  updatedUser: User[];
  errorMessage: any;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private zone: NgZone
  ) {
    this.formEdit = this.createFormGroup();
    this.subscription = this.userService.nameData$.subscribe((data) => {
      this.user = data;
    });
  }
  ngOnInit(): void {}

  createFormGroup() {
    return new FormGroup({
      userName: new FormControl('', [Validators.minLength(2)]),
      email: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      dateOfBirth: new FormControl(''),
      address: new FormControl('', [Validators.minLength(6)]),
      zipCode: new FormControl('', [
        Validators.pattern('[1-9][0-9]{3}s?[a-zA-Z]{2}'),
      ]),
      phone: new FormControl('', [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      profession: new FormControl(''),
    });
  }

  updateUser() {
    this.apiService
      .updateUser(this.user[0]._id, this.formEdit.value)
      .subscribe({
        next: (res: User[]) => {
          this.updatedUser = res;
          this.userService.setData(this.updatedUser);
          this.zone.run(() => {
            this.router.navigateByUrl('myAccount');
          });
        },
        error: (err) => (this.errorMessage = err.error),
      });
  }
}
