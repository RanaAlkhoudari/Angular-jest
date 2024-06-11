import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpClient: HttpClient;
  const id = '6658362b091ad8390b95abf9';
  const url = 'http://localhost:3000/user';

  const user: any = {
    address: 'Utrecht 30',
    dateOfBirth: '1999-05-20',
    email: 'jana@test.com',
    phone: 9876543210,
    profession: 'lawyer',
    userName: 'Jana',
    zipCode: '4321EW',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    apiService = TestBed.inject(ApiService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  describe('Delete request', () => {
    it('should be called with the expected url while using delete request', (done): void => {
      const getRequestSpy = jest
        .spyOn(httpClient, 'delete')
        .mockReturnValue(of({ message: 'successfuly deleted' }));
      apiService.deleteUser(id).subscribe({
        next: (res) => {
          expect(res).toEqual({ message: 'successfuly deleted' });
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(`${url}/${id}`);
    });

    it('should return an error message while using delete request', (done): void => {
      const errorResponse = new HttpErrorResponse({
        error: '404 User not found',
        status: 404,
        statusText: 'User not found',
      });
      const getRequestSpy = jest
        .spyOn(httpClient, 'delete')
        .mockReturnValue(throwError(() => errorResponse));
      apiService.deleteUser(id).subscribe({
        next: (res) => console.log(res),
        error: (err) => {
          expect(err.message).toContain('404 User not found');
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(`${url}/${id}`);
    });
  });

  describe('Get request to get all users', () => {
    it('should be called with the expected url while using get request', (done): void => {
      const getRequestSpy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of(user));
      apiService.getUsers().subscribe({
        next: (res) => {
          expect(res).toEqual(user);
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(`${url}s`);
    });
  });

  describe('Get request to get a specific user', () => {
    it('should be called with the expected url while using get request to get a specific user', (done): void => {
      const getRequestSpy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of(user));
      apiService.getUser(id).subscribe({
        next: (res) => {
          expect(res).toEqual(user);
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(`${url}/${id}`);
    });

    it('should return an error message while using get request', (done): void => {
      const errorResponse = new HttpErrorResponse({
        error: '404 User not found',
        status: 404,
        statusText: 'User not found',
      });
      const getRequestSpy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(throwError(() => errorResponse));
      apiService.getUser(id).subscribe({
        next: (res) => console.log(res),
        error: (err) => {
          expect(err.message).toContain('404 User not found');
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(`${url}/${id}`);
    });
  });

  describe('Put request', () => {
    const updateUser = {
      userName: 'Yousuf',
    };
    it('should be called with the expected url while using put request', (done): void => {
      const getRequestSpy = jest
        .spyOn(httpClient, 'put')
        .mockReturnValue(of(user));

      apiService.updateUser(id, updateUser).subscribe({
        next: (res) => {
          expect(res).toEqual(user);
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(
        `${url}/edit/${id}`,
        updateUser
      );
    });

    it('should return an error message while using put request', (done): void => {
      const errorResponse = new HttpErrorResponse({
        error: '404 User not found',
        status: 404,
        statusText: 'User not found',
      });
      const getRequestSpy = jest
        .spyOn(httpClient, 'put')
        .mockReturnValue(throwError(() => errorResponse));
      apiService.updateUser(id, updateUser).subscribe({
        next: (res) => console.log(res),
        error: (err) => {
          expect(err.message).toContain('404 User not found');
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(
        `${url}/edit/${id}`,
        updateUser
      );
    });
  });

  describe('Post request', () => {
    it('should be called with the expected url while using post request', (done): void => {
      const getRequestSpy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue(of(user));
      apiService.addUser(user).subscribe({
        next: (res) => {
          expect(res).toEqual(user);
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(url, user);
    });

    it('should return an error message while using post request', (done): void => {
      const errorResponse = new HttpErrorResponse({
        error: '404 User not found',
        status: 404,
        statusText: 'User not found',
      });
      const getRequestSpy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue(throwError(() => errorResponse));
      apiService.addUser(user).subscribe({
        next: (res) => console.log(res),
        error: (err) => {
          expect(err.message).toContain('404 User not found');
          done();
        },
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(url, user);
    });
  });
});
