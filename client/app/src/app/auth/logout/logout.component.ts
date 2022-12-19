import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenStorageService, private authService: AuthService) { 
    this.authService.logout(this.tokenService.getUser().accessToken);
    this.tokenService.signOut();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
