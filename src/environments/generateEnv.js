
exports.handler = async (event, context, callback) => {

const AWS = require('aws-sdk')

AWS.config.update({
  region: 'ca-central-1'
})

const parameterStore = new AWS.SSM()

const getParam = param => {
  return new Promise((res, rej) => {
    parameterStore.getParameter({
      Name: param
    }, (err, data) => {
        if (err) {
          return rej(err)
        }
        return res(data)
    })
  })
}
    //TODO -> extract stage from function name and use this to determine ssm param name
    //console.log('stage: ' + context.functionName.split("-")[0]);

    const param = await getParam('ci-rockset-api-key');

    console.log('ssm = ' + JSON.stringify(param));
    console.log('context: ', context);
    console.log('VTL details: ', event);
    callback(null, param);
};
