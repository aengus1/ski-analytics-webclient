// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  amplify: {
    Auth: {
      // region: 'us-west-2',
      // userPoolId: 'us-west-2_FrH0UdrNz',
      // userPoolWebClientId: '755f5d0elsg5ie96116540qm3u',
      region: 'ca-central-1',
      userPoolId: 'ca-central-1_uTYfG6acX',
      userPoolWebClientId: 'iod0j9ft7b913s7ao082tbstl',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_PASSWORD_AUTH'
    },
    API: {
      'aws_appsync_graphqlEndpoint': 'https://davocdlxgjhhhdyf5o26toeo7m.appsync-api.us-east-1.amazonaws.com/graphql',
      'aws_appsync_region': 'us-east-1',
      'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
    }
  },
  domain: 'mccullough-solutions.ca',
  api: 'dev-api.mccullough-solutions.ca',
  graphql: 'https://davocdlxgjhhhdyf5o26toeo7m.appsync-api.us-east-1.amazonaws.com/graphql',
  // ws: 'wss://c4at2w51lg.execute-api.us-west-2.amazonaws.com/staging'
   ws: 'wss://d-moo9e7jyd7.execute-api.ca-central-1.amazonaws.com'

};
