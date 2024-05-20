#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CustomerIdentityStack } from "../lib/customer-identity-stack";

const app = new cdk.App();
const CDK_DEFAULT_ACCOUNT = "654654391715";
const CDK_DEFAULT_REGION = "eu-west-2";

const applicationName = "thingamajig";
const theYear3000 = "3000-01-01 00:00:00";
const dev = "env-dev";

new CustomerIdentityStack(app, "CustomerIdentityStack", {
  env: { account: CDK_DEFAULT_ACCOUNT, region: CDK_DEFAULT_REGION },
  tags: {
    application: applicationName,
    "creation date": "2024-05-16 16:00:00",
    criticality: "criticality-required",
    "data scope": "data-privileged",
    environment: dev,
    "expiry date": theYear3000,
  },
});
