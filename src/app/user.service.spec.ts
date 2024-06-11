import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../interfaces/userInterface';

describe('UserService', () => {
  let userService: UserService;
  const user: User[] = [
    {
      address: 'Utrecht 30',
      dateOfBirth: '1999-05-20',
      email: 'jana@test.com',
      phone: 9876543210,
      profession: 'lawyer',
      userName: 'Jana',
      zipCode: '4321EW',
      _id: '66588dda091ad8390b95ac37',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should set the user date', () => {
    userService.setData(user);
    let userData:User[];
    userService.nameData$.subscribe((res) => {
      userData = res;
    });
    expect(userData).toEqual(user);
  });
});
