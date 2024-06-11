import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  const user: any = {
    address: 'Utrecht 30',
    dateOfBirth: '1999-05-20',
    email: 'jana@test.com',
    phone: 8712345678,
    profession: 'lawyer',
    userName: 'Jana',
    zipCode: '4321EW',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RegisterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test a form group elements count', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#formRegister');
    const inputElement = formElement.querySelectorAll('input');
    expect(inputElement.length).toEqual(6);
  });

  it('Should initialize form with controls', () => {
    const formControls = component.formRegister.controls;
    expect(formControls['userName']).toBeTruthy();
    expect(formControls['email']).toBeTruthy();
    expect(formControls['dateOfBirth']).toBeTruthy();
    expect(formControls['address']).toBeTruthy();
    expect(formControls['zipCode']).toBeTruthy();
    expect(formControls['phone']).toBeTruthy();
    expect(formControls['profession']).toBeTruthy();
  });

  it('Should invalidate the form when empty', () => {
    expect(component.formRegister.valid).toBeFalsy();
  });

  it('Check register form is valid when validations are fulfilled and the sumbit button is enabled', () => {
    const userNameInput = component.formRegister.controls['userName'];
    const emailInput = component.formRegister.controls['email'];
    const dateOfBirthInput = component.formRegister.controls['dateOfBirth'];
    const addressInput = component.formRegister.controls['address'];
    const zipCodeInput = component.formRegister.controls['zipCode'];
    const phoneInput = component.formRegister.controls['phone'];
    const professionInput = component.formRegister.controls['profession'];

    expect(userNameInput.valid).toBeFalsy();
    expect(emailInput.valid).toBeFalsy();
    expect(dateOfBirthInput.valid).toBeFalsy();
    expect(addressInput.valid).toBeFalsy();
    expect(zipCodeInput.valid).toBeFalsy();
    expect(phoneInput.valid).toBeFalsy();
    expect(professionInput.valid).toBeFalsy();

    userNameInput.setValue('John Peter');
    emailInput.setValue('john@test.com');
    dateOfBirthInput.setValue('2020-08-22');
    addressInput.setValue('Utrecht');
    zipCodeInput.setValue('3232vf');
    phoneInput.setValue(6543767689);
    professionInput.setValue('lawyer');

    expect(userNameInput.valid).toBeTruthy();
    expect(emailInput.valid).toBeTruthy();
    expect(dateOfBirthInput.valid).toBeTruthy();
    expect(addressInput.valid).toBeTruthy();
    expect(zipCodeInput.valid).toBeTruthy();
    expect(phoneInput.valid).toBeTruthy();
    expect(professionInput.valid).toBeTruthy();
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#formRegister');
    expect(component.formRegister.valid).toBeTruthy();
    expect(formElement.querySelector('button').disabled).toBeTruthy();
  });

  it('The submit button shoud be disabled', () => {
    component.formRegister.controls['userName'].setValue('John Peter');
    component.formRegister.controls['email'].setValue('john@test.com');
    component.formRegister.controls['dateOfBirth'].setValue('2020-08-22');
    component.formRegister.controls['address'].setValue('Utrecht');
    component.formRegister.controls['zipCode'].setValue('3232vf');
    //Wrong phone number
    component.formRegister.controls['phone'].setValue(654657623689);
    component.formRegister.controls['profession'].setValue('lawyer');

    const formElement =
      fixture.debugElement.nativeElement.querySelector('#formRegister');

    expect(formElement.querySelector('button').disabled).toBeTruthy();
  });

  it('Should navigate to "myAccount" on successful form submission', () => {
    component.formRegister.setValue({
      address: 'Utrecht 30',
      dateOfBirth: '1999-05-20',
      email: 'jana@test.com',
      phone: 8712345678,
      profession: 'lawyer',
      userName: 'Jana',
      zipCode: '4321EW',
    });

    expect(component.formRegister.valid).toBeTruthy();
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    jest.spyOn(component['apiService'], 'addUser').mockReturnValue(of(user));
    component.onSubmit();
    expect(component['apiService'].addUser).toHaveBeenCalledTimes(1);
    expect(component['apiService'].addUser).toHaveBeenCalledWith(user);
    expect(navigateSpy).toHaveBeenCalledWith('myAccount');
  });
});
