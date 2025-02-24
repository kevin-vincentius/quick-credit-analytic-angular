import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/i-login';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { IApiResponse } from '../interfaces/i-api-response';

@Injectable()
export class AuthenticationService {
  private _sessionId: string = '';
  private _namaLengkap: string = '';
  private _idUser: string = '';
  private _isLoggedIn: boolean = false;
  public _levelAkses = '';

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService
  ) {
    this.loadSession();
  }

  login(loginData: ILogin): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(loginData);
    return this.http
      .post<IApiResponse>(
        `${this.baseHttpService.baseURL}/api/v1/auth/login`,
        body,
        {
          headers,
          observe: 'response',
        }
      )
      .pipe(
        tap((response) => {
          const sessionId = response.headers.get('X-Session');
          const namaLengkap = response.body?.data.namaLengkap;
          const idUser = response.body?.data.idUser;
          const levelAkses = response.body?.data.akses.levelAkses;
          console.log(levelAkses);

          if (sessionId) {
            this.sessionId = sessionId;
            this.namaLengkap = namaLengkap;
            this.idUser = idUser;
            this.levelAkses = levelAkses;
          }
        })
      );
  }

  get sessionId(): string {
    return this._sessionId || localStorage.getItem('sessionId') || '';
  }

  set sessionId(value: string) {
    this._sessionId = value;
    localStorage.setItem('sessionId', value);
  }

  get namaLengkap(): string {
    return this._namaLengkap || localStorage.getItem('namaLengkap') || '';
  }

  set namaLengkap(value: string) {
    this._namaLengkap = value;
    localStorage.setItem('namaLengkap', value);
  }

  get idUser(): string {
    return this._idUser || localStorage.getItem('userId') || '';
  }

  set idUser(value: string) {
    this._idUser = value;
    localStorage.setItem('idUser', value);
  }

  get levelAkses(): string {
    return this._levelAkses || localStorage.getItem('levelAkses') || '';
  }

  set levelAkses(value: string) {
    this._levelAkses = value;
    localStorage.setItem('levelAkses', value);
  }

  sessionStart() {
    this._isLoggedIn = true;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn || !!localStorage.getItem('sessionId');
  }

  logout() {
    this._isLoggedIn = false;
    localStorage.removeItem('levelAkses');
    localStorage.removeItem('idUser');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('namaLengkap');
  }

  loadSession(): void {
    const sessionId = localStorage.getItem('sessionId');
    const idUser = localStorage.getItem('idUser');
    const namaLengkap = localStorage.getItem('namaLengkap');

    if (sessionId) {
      this._sessionId = sessionId;
      this._isLoggedIn = true;
      this._idUser = idUser || '';
      this._namaLengkap = namaLengkap || '';
    } else {
      this._isLoggedIn = false;
    }
  }

  get baseHttp(): BaseHttpService {
    return this.baseHttpService;
  }
}
