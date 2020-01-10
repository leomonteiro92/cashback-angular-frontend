import { AuthConfig } from 'angular-oauth2-oidc';
import { environment as env } from '../../environments/environment';

export const authConfig: AuthConfig = {
    tokenEndpoint: `${env.API_HOSTNAME}/token`,
    clientId: 'c@shb@ck',
    loginUrl: '/signin',
    oidc: false,
    showDebugInformation: true,
    requireHttps: false,
    dummyClientSecret: 'c@shb@ck'
}