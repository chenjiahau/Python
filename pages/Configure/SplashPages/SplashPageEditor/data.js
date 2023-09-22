import clickThrough from './click-through';
import signOnWithBasicLogin from './sign-on-with-basic-login';
import signOnWithBasicLoginAndThirdPartyCredentials from './sign-on-with-basic-login-and-third-party-credentials';
import signOnWithEmailAuthenticationSmsThirdPartyCredentials from './sign-on-with-email-authentication-sms-authentication-and-third-party-credentials';
import signOnWithSmsAuthentication from './sign-on-with-sms-authentication';
import signOnWithThirdPartyCredential from './sign-on-with-third-party-credentials';

const data = {
  'Click-through': clickThrough,
  'Sign-on with basic login': signOnWithBasicLogin,
  'Sign-on with basic login and third party credentials': signOnWithBasicLoginAndThirdPartyCredentials,
  'Sign-on with email authentication, SMS authentication and third party credentials': signOnWithEmailAuthenticationSmsThirdPartyCredentials,
  'Sign-on with SMS authentication': signOnWithEmailAuthenticationSmsThirdPartyCredentials,
  'Sign-on with third party credentials': signOnWithThirdPartyCredential
}

export default data;