import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import Swal from 'sweetalert2';

@Injectable()
export class BaseHttpService {
  baseURL: string = environment.baseUrl;
  constructor() {}

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      // console.error(
      //   `Backend returned code ${error.status}, body was: `,
      //   error.error
      // );

      if (error.status === 401) {
        Swal.fire({
          icon: 'error',
          title: `${error.status}`,
          text: `${error.error.detail}`,
        });
      }

      if (error.status === 404) {
        Swal.fire({
          icon: 'error',
          title: `${error.status}`,
          text: `${error.error.detail}`,
        });
      }
    }

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error(`Something bad happened; please try again later.`)
    );
  }
}
