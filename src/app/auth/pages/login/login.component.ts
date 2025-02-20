import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = ''; 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      idUser: [20240301, [Validators.required]],
      password: ['abcd1234', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/form-quca']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let loginPayload = {
        idUser: this.loginForm.value.idUser,
        password: this.loginForm.value.password,
      };

      this.authService.login(loginPayload).subscribe({
        next: (resp) => {
          this.authService.sessionStart();
          this.router.navigate(['/form-quca']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.loginError = 'User ID atau password salah!';
          }
        },
      });
    } else {
      console.log('form is invalid');
    }
  }
}
