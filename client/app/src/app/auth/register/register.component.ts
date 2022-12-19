import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from '../../shared/validators/password-group-match-validator';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    personalinfo: [''],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      repass: []
    },{
      validators: [passwordsMatchValidator('password', 'repass')]
    })
  });

  // isSuccessful = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmitHandler(): void {
    if (this.registerForm.valid) {
      this.authService.register(
          this.registerForm.value.email!,
          this.registerForm.value.firstname!,
          this.registerForm.value.lastname!,
          this.registerForm.value.personalinfo!,
          this.registerForm.value.passwords?.password!
          ).subscribe(
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
