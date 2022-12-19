import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { 

  }

  ngOnInit(): void {
  }
  
  formSubmitHandler(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
        }
      )
      this.router.navigate(['/'])
    } else {
      return;
    }
  }
}
