export const environment = {
  production: true,
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
  },
  domain: 'crunch.ski',
  api: 'https://fgtcxjggck.execute-api.ca-central-1.amazonaws.com/',
  graphql: 'https://xuohcwldnjgdrga4fqvxk6vcwe.appsync-api.us-west-2.amazonaws.com/graphql'
};
