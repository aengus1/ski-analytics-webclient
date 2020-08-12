#!/bin/bash

## Script to pull down environment configuration from hosting bucket, generate environment.ts
stage=$1
path=static/environment.txt


# Download mustache bash and move to lib folder
curl -sSL https://git.io/get-mo -o mo
mv mo ./lib
chmod +x lib/mo



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


## Pull down bucket name from SSM

  aws configure set region ca-central-1

  bucket=`aws ssm get-parameter --name=${stage}-app-bucket-name | jq '.[] | {Value} .Value'`

## Pull down environment file
if curl --output /dev/null --silent --head --fail "${bucket}/${path}"; then
  echo "URL exists:  ${bucket}/${path}"
  curl ${bucket}/${path} > /tmp/environment.txt
else
  echo "URL does not exist: $url"
  exit 1;
fi

## Pull the template into a variable
echo `cat ../src/environment/environment.mustache`>template

## Pull the view into a variable
echo `cat /tmp/environment.txt` >view

## Do the magic
echo "$view "



