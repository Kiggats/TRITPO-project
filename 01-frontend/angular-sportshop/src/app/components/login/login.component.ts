import { Component, OnInit } from '@angular/core';
import MyAppConfig from '../../config/my-app-config';
import {OktaAuthStateService} from "@okta/okta-angular";
import * as OktaSignIn from '@okta/okta-signin-widget';
import {OktaAuth, pkce} from "@okta/okta-auth-js";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthStateService,
              private oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',

      features: {
        registration: true
      },

      baseUrl: MyAppConfig.oidc.issuer.split('/oauth2')[0],

      clientId: MyAppConfig.oidc.clientId,

      redirectUri: MyAppConfig.oidc.redirectUri,

      authParams: {

        pkce: true,

        issuer: MyAppConfig.oidc.issuer,

        scopes: MyAppConfig.oidc.scopes

      }

    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'},
      (response: any) => {
      if(response.status === 'SUCCESS') {
        this.oktaAuth.signInWithRedirect();
      }
    },
    (error: any) => {
      throw  error;
    }
    )
  };

}
