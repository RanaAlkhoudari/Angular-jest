import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyAccountComponent } from './my-account.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;
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
      declarations: [MyAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the api service', () => {
    jest
      .spyOn(component['apiService'], 'deleteUser')
      .mockReturnValue(of({ message: 'successfuly deleted' }));
    component.user.push(user);
    component.deleteUser();
    expect(component['apiService'].deleteUser).toHaveBeenCalledTimes(1);
    expect(component.message).toEqual({ message: 'successfuly deleted' });
  });

  it('should navigate to edit page', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    component.editUser();
    expect(navigateSpy).toHaveBeenCalledWith('edit');
  });

  it('should navigate to edit page', () => {
    component.user.push(user);
    component.updatedUser.push(user);
    jest.spyOn(component['apiService'], 'getUser').mockReturnValue(of([user]));
    component.ngOnInit();
    expect(component['apiService'].getUser).toHaveBeenCalledTimes(1);
  });
});
