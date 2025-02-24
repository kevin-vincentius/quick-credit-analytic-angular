import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IFormQUCA } from '../interfaces/i-form-quca';
import { IApiResponse } from '../interfaces/i-api-response';
import { AuthenticationService } from './authentication.service';
import { IPagination } from '../interfaces/i-pagination';
import { IMobileEntry } from '../interfaces/i-mobile-entry';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QUCAService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private baseHttpService: BaseHttpService,
    private authService: AuthenticationService
  ) {
    this.apiUrl = `${this.baseHttpService.baseURL}/api/v1/quick-credit-analytic`;
  }

  getListForm(): Observable<any> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId);

    return this.http.get<any>(`${this.apiUrl}/get-list-form`, {
      headers,
      withCredentials: true,
      observe: 'response',
    });
  }

  getFormByMID(mid: number): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId);

    return this.http.get<IApiResponse<IFormQUCA>>(
      `${this.apiUrl}/get-form-detail/${mid}`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  getDataKonsumenByMID(mid: number): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId);

    return this.http.get<IApiResponse<IMobileEntry>>(
      `${this.apiUrl}/get-mid/${mid}`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  submitFormQUCA(reqFormQUCA: IFormQUCA): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId || '');

    return this.http.post<IApiResponse>(
      `${this.apiUrl}/new-form`,
      reqFormQUCA,
      {
        headers,
      }
    );
  }

  updateFormQUCA(reqFormQUCA: IFormQUCA): Observable<IApiResponse>{
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId || '');
    const mid = reqFormQUCA.mid;

    return this.http.post<IApiResponse>(
      `${this.apiUrl}/update-form`,
      reqFormQUCA,
      {
        headers,
      }
    );
  }

  approveFormQUCA(mid: number): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId || '');

    return this.http.post<IApiResponse>(
      `${this.apiUrl}/approve-form/${mid}`,
      {},
      {
        headers,
      }
    );
  }

  rejectFormQUCA(mid: number, rejectNotes: string): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId || '');

    return this.http.post<IApiResponse>(
      `${this.apiUrl}/reject-form`,
      {
        mid: mid,
        notes: rejectNotes,
      },
      {
        headers,
      }
    );
  }
}
