import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get isLoggedIn() {
    return this.tokenService.getUser().email!= undefined;
  }

  get user() {
    return this.tokenService.getUser()
  }

  constructor(private tokenService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

}
