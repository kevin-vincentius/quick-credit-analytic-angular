import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { AuthenticationService } from './authentication.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identity, Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/i-api-response';
import { IFormPerubahan } from '../interfaces/i-form-perubahan';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private baseHttpService: BaseHttpService,
    private authService: AuthenticationService
  ) {
    this.apiUrl = `${this.baseHttpService.baseURL}/api/v1/form-perubahan`;
  }

  getListForm(): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId);

    return this.http.get<any>(`${this.apiUrl}`, {
      headers,
      withCredentials: true,
    });
  }

  getListCabang(): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId);

    return this.http.get<any>(
      `${this.baseHttpService.baseURL}/api/v1/get-list-cabang`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  getScoreCabang(idCabang: number): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId);

    return this.http.get<any>(
      `${this.baseHttpService.baseURL}/api/v1/get-branch-score/${idCabang}`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  getDetailFormPerubahan(idFormPerubahan: number): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId);

    return this.http.get<any>(
      `${this.baseHttpService.baseURL}/api/v1/form-perubahan/${idFormPerubahan}`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  submitFormPerubahan(
    reqFormPerubahan: IFormPerubahan
  ): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId || '');

    console.log(sessionId);

    return this.http.post<IApiResponse>(
      `${this.apiUrl}/add`,
      reqFormPerubahan,
      {
        headers,
      }
    );
  }

  approveFormPerubahan(idFormPerubahan: number): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId || '');

    return this.http.post<IApiResponse>(
      `${this.apiUrl}/${idFormPerubahan}/approve`,
      {},
      {
        headers,
      }
    );
  }

  rejectFormPerubahan(idFormPerubahan: number): Observable<IApiResponse> {
    const sessionId = this.authService.sessionId;
    const headers = new HttpHeaders().set('X-Session', sessionId || '');

    return this.http.post<IApiResponse>(
      `${this.apiUrl}/${idFormPerubahan}/reject`,
      {},
      {
        headers,
      }
    );
  }
}
