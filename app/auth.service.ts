import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig }        from './auth.config';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
    // Configure Auth0
    // lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});

        lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {
            languageDictionary: {
                signUpTerms: "I agree to the <a href='/terms' target='_new'>terms of service</a> and <a href='/privacy' target='_new'>privacy policy</a>.",
                title: "My Company"
            },
            auth: {
                responseType: 'id_token token',
                params: {
                    audience: 'https://resourceapi.com',
                    // Learn about scopes: https://auth0.com/docs/scopes
                    scope: 'openid profile'
                }
            }
        });

    constructor() {
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', (authResult) => {
            console.log(authResult);
            localStorage.setItem('id_token', authResult.idToken);
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
    };
}
