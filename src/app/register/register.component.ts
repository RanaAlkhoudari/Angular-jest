import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../interfaces/userInterface';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup = null;
  user: User[];
  professionsList: any = ['lawyer', 'architect', 'doctor', 'other'];
  errorMessage: any;
  message: {};

  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private zone: NgZone
  ) {
    this.formRegister = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[1-9][0-9]{3}s?[a-zA-Z]{2}'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      profession: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  onSubmit(): void {
    if (this.formRegister.valid) {
      this.apiService.addUser(this.formRegister.value).subscribe({
        next: (res: User[]) => {
          this.user = res;
          this.userService.setData(this.user);
          this.zone.run(() => {
            this.router.navigateByUrl('myAccount');
          });
        },
        error: (err) => (this.errorMessage = err.error),
      });
    }
  }
}
