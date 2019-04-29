import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signout-page',
  template: `
    <div class="signout">
      <img class="mb-4" src="../../../assets/images/logo_only.png" alt="" width="64" height="61">
      <h1 class="h3 mb-3 font-weight-normal">You are now signed out</h1>
      <hr>
      <a routerLink="/signin">Return to sign in</a>
      <p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
    </div>`,
  styleUrls: ['./signout-page.component.scss']
})
export class SignoutPageComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.signOut();
  }

}
