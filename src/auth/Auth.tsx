import auth0, { Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';
import history from './History';
import autobind from 'autobind-decorator';

export default class Auth {
    private accessToken: string;
    private idToken: string;
    private expiresAt: number;
    private userinfo: Auth0UserProfile;
    private handleEmailUpdate: (email: string) => void;
    private handleTokenUpdate: (token: string) => void;

    constructor(handleEmailUpdate: (email: string) => void, handleTokenUpdate: (token: string) => void) {
        this.handleEmailUpdate = handleEmailUpdate;
        this.handleTokenUpdate = handleTokenUpdate;
    }

    auth0 = new auth0.WebAuth({
        domain: 'cidc-test.auth0.com',
        clientID: 'Yjlt8LT5vXFJw1Z8m8eaB5aZO26uPyeD',
        redirectUri: window.location.origin + '/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    @autobind
    login() {
        this.auth0.authorize();
    }

    @autobind
    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult, '/');
            } else if (err) {
                history.replace('/');
            }
        });
    }

    @autobind
    getAccessToken() {
        return this.accessToken;
    }

    @autobind
    getIdToken() {
        return this.idToken;
    }

    @autobind
    getEmail() {
        return this.userinfo.email;
    }

    @autobind
    setSession(authResult: Auth0DecodedHash, returnPath: string) {

        localStorage.setItem('isLoggedIn', 'true');

        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;
        this.handleTokenUpdate(this.idToken);
        this.auth0.client.userInfo(this.accessToken, (err, userinfo) => {
            this.userinfo = userinfo;
            if (userinfo) {
                this.handleEmailUpdate(this.getEmail());
            }
        });

        history.replace(returnPath);
    }

    @autobind
    renewSession(returnPath: string) {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult, returnPath);
            } else if (err) {
                this.logout();
            }
        });
    }

    @autobind
    logout() {

        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;
        this.userinfo = null;

        localStorage.removeItem('isLoggedIn');

        this.auth0.authorize();
    }

    @autobind
    isAuthenticated() {

        const expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
    }

    @autobind
    checkAuth(returnPath: string) {
        if (!this.isAuthenticated()) {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                this.renewSession(returnPath);
                return true;
            } else {
                this.login();
                return false;
            }
        }

        return true;
    }
}
