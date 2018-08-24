// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  amplify: {
    Auth: {
      region: 'us-west-2',
      userPoolId: 'us-west-2_FrH0UdrNz',
      userPoolWebClientId: '755f5d0elsg5ie96116540qm3u',
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
