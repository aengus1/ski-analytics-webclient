#!/bin/bash

# Exit script if you try to use an uninitialized variable.
set -o nounset

# Exit script if a statement returns a non-true return value.
set -o errexit

# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail
if [[ "$1" != "" ]]; then
    STAGE="$1"
else
    echo ERROR: Failed to supply stage parameter. Valid values: [staging, prod]
    exit 1
fi

## Pull down bucket name and Cloudfront distribution name from SSM

  aws configure set region ca-central-1

  bucket=`aws ssm get-parameter --name=${STAGE}-app-bucket-name | jq '.[] | {Value} .Value'`
  cf=`aws ssm get-parameter --name=${STAGE}-cfdistro-name | jq '.[] | {Value} .Value'`

## Strip quotes from variables

  bucket="${bucket%\"}"
  bucket="${bucket#\"}"

  cf="${cf%\"}"
  cf="${cf#\"}"


## Publish to S3
echo "Attempting to deploy to s3://${bucket}"

aws s3 sync workspace/dist/* s3://${bucket} --delete

## Invalidate the Cache
aws cloudfront create-invalidation --distribution-id ${cf} --paths /*






