import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  const user = {
    address: 'Utrecht 30',
    dateOfBirth: '1999-05-20',
    email: 'jana@test.com',
    phone: 9876543210,
    profession: 'lawyer',
    userName: 'Jana',
    zipCode: '4321EW',
    _id: '66588dda091ad8390b95ac37',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    jest.spyOn(component['apiService'], 'getUsers').mockReturnValue(of([user]));
    component.getUsers();
    expect(component['apiService'].getUsers).toHaveBeenCalledTimes(1);
    expect(component.users).toEqual([user]);
  });

  it('should navigate to edit page', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    jest.spyOn(component['apiService'], 'getUser').mockReturnValue(of([user]));
    component.editUser(user._id);
    expect(component['apiService'].getUser).toHaveBeenCalledTimes(1);
    expect(component.user).toEqual([user]);
    expect(navigateSpy).toHaveBeenCalledWith('edit');
  });

  it('should call delete user service', () => {
    jest
      .spyOn(component['apiService'], 'deleteUser')
      .mockReturnValue(of({ message: 'successfuly deleted' }));
    component.deleteUser(user._id);
    expect(component['apiService'].deleteUser).toHaveBeenCalledTimes(1);
    expect(component.message).toEqual({ message: 'successfuly deleted' });
  });

  it('should navigate to myAccount page', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    jest.spyOn(component['apiService'], 'getUser').mockReturnValue(of([user]));
    component.navigateToMayAccount(user._id);
    expect(component['apiService'].getUser).toHaveBeenCalledTimes(1);
    expect(component.user).toEqual([user]);
    expect(navigateSpy).toHaveBeenCalledWith('myAccount');
  });
});
