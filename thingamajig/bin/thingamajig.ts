#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CustomerIdentityService as CustomerIdentityService } from "../lib/customer-identity-service";
import { ApplicationValues } from "../magic-strings";
import { StackName } from "../naming-factory";
// import { CustomerAccountStack } from "../lib/customer-account-stack";

const app = new cdk.App();
const CDK_DEFAULT_ACCOUNT = "654654391715";
const CDK_DEFAULT_REGION = "eu-west-2";

const theYear3000 = "3000-01-01 00:00:00";
const dev = "env-dev";

new CustomerIdentityService(app, StackName("CustomerIdentityService"), {
  env: { account: CDK_DEFAULT_ACCOUNT, region: CDK_DEFAULT_REGION },
  tags: {
    application: ApplicationValues.applicationName,
    "creation date": "2024-05-16 16:00:00",
    criticality: "criticality-required",
    "data scope": "data-privileged",
    environment: dev,
    "expiry date": theYear3000,
  },
});

// new CustomerAccountStack(app, "CustomerAccountStack", {
//   env: { account: CDK_DEFAULT_ACCOUNT, region: CDK_DEFAULT_REGION },
//   tags: {
//     application: applicationName,
//     "creation date": "2024-05-21 12:00:00",
//     criticality: "criticality-required",
//     "data scope": "data-privileged",
//     environment: dev,
//     "expiry date": theYear3000,
//   },
// });
