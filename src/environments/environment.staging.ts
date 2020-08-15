// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  amplify: {
    Auth: {
      region: 'ca-central-1',
      userPoolId: 'ca-central-1_uTYfG6acX',
      userPoolWebClientId: 'iod0j9ft7b913s7ao082tbstl',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_PASSWORD_AUTH'
    },
    API: {
      'aws_appsync_graphqlEndpoint': 'https://br4alynpkbgzlngox7gwtux57e.appsync-api.ca-central-1.amazonaws.com/graphql',
      'aws_appsync_region': 'us-east-1',
      'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
    }
  },
  domain: 'mccullough-solutions.ca',
  api: 'https://dev-api.mccullough-solutions.ca/dev/',
  graphql: 'https://br4alynpkbgzlngox7gwtux57e.appsync-api.ca-central-1.amazonaws.com/graphql',
  ws: 'wss://qcp32et0k2.execute-api.ca-central-1.amazonaws.com/dev'

};
