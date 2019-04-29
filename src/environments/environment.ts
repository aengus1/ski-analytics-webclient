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
      authenticationFlowType: 'USER_PASSWORD_AUTH'
    },
    API: {
      'aws_appsync_graphqlEndpoint': 'https://xuohcwldnjgdrga4fqvxk6vcwe.appsync-api.us-west-2.amazonaws.com/graphql',
      'aws_appsync_region': 'us-west-2',
      'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
    }
  },
  domain: 'staging.crunch.ski',
  api: 'https://fgtcxjggck.execute-api.ca-central-1.amazonaws.com/staging/'
};
