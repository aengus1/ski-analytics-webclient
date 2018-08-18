export const environment = {
  production: true,
  amplify: {
    Auth: {
      region: 'ca-central-1',
      userPoolId: '',
      userPoolWebClientId: '',
      mandatorySignIn: true,
      cookieStorage: {
        domain: '.staging-app.crunch.ski',
        path: '/',
        expires: 365,
        secure: true
      },
      authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
  }
};
