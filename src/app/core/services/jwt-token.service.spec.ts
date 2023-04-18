import { TestBed } from '@angular/core/testing';
import jwt_decode from 'jwt-decode';
import { JwtTokenService } from './jwt-token.service';

describe('JwtTokenService', () => {
  let service: JwtTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setToken', () => {
    it('should set the jwtToken property when passed a token', () => {
      const token = 'fake.token.string';
      service.setToken(token);
      expect(service.jwtToken).toEqual(token);
    });

    it('should not set the jwtToken property when not passed a token', () => {
      service.setToken(null);
      expect(service.jwtToken).toBeUndefined();
    });
  });

  describe('decodeToken', () => {
    it('should set the decodedToken property when jwtToken is set', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      service.setToken(token);
      service.decodeToken();
      expect(service.decodedToken).toEqual(jwt_decode(token));
    });

    it('should not set the decodedToken property when jwtToken is not set', () => {
      service.setToken(null);
      service.decodeToken();
      expect(service.decodedToken).toBeUndefined();
    });
  });

  describe('getDecodeToken', () => {
    it('should return the decoded token', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      service.setToken(token);
      const decodedToken = jwt_decode(token);
      expect(service.getDecodeToken()).toEqual(decodedToken);
    });
  });

  describe('getUser', () => {
    it('should return the username from decodedToken', () => {
      const decodedToken = {
        "sub": "1234567890",
        "username": "John Doe",
        "iat": '1516239022'
      };
      service.decodedToken = decodedToken;
      expect(service.getUser()).toEqual(decodedToken.username);
    });

    it('should return null if decodedToken is not set', () => {
      service.decodedToken = null;
      expect(service.getUser()).toBeNull();
    });
  });

  describe('getEmailId', () => {
    it('should return the email from decodedToken', () => {
      const decodedToken = { username: 'testUser', email: 'test@example.com', exp: '123456' };
      service.decodedToken = decodedToken;
      expect(service.getEmailId()).toEqual(decodedToken.email);
    });

    it('should return null if decodedToken is not set', () => {
      service.decodedToken = null;
      expect(service.getEmailId()).toBeNull();
    });
  });

  describe('getExpiryTime', () => {
    it('should return the exp from decodedToken', () => {
      const decodedToken = { username: 'testUser', email: 'test@example.com', exp: '123456' };
      service.decodedToken = decodedToken;
      expect(service.getExpiryTime()).toEqual(decodedToken.exp);
    });

    it('should return null if decodedToken is not set', () => {
      service.decodedToken = null;
      expect(service.getExpiryTime()).toBeNull();
    });
  });
});
