import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditUserComponent } from './edit-user.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let router: Router;

  const user: any = {
    address: 'Utrecht 30',
    dateOfBirth: '1999-05-20',
    email: 'jana@test.com',
    phone: 9876543210,
    profession: 'lawyer',
    userName: 'Jana',
    zipCode: '4321EW',
  };

  const updateUser: any = {
    address: 'Amsterdam 30',
    dateOfBirth: '1999-05-20',
    email: 'jana@test.com',
    phone: 9876003210,
    profession: 'doctor',
    userName: 'Yusuf',
    zipCode: '4321EW',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EditUserComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate to myAccont page', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    component.user.push(user);
    jest
      .spyOn(component['apiService'], 'updateUser')
      .mockReturnValue(of(updateUser));
    component.updateUser();
    expect(component['apiService'].updateUser).toHaveBeenCalledTimes(1);
    expect(component.user).toEqual(updateUser);
    expect(navigateSpy).toHaveBeenCalledWith('myAccount');
  });
});
