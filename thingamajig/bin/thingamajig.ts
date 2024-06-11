#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CustomerIdentityService as CustomerIdentityService } from "../lib/customer-identity-service";
import { AccountValues } from "../magic-strings";
import { StackName } from "../naming-factory";
import { CustomerAccountService } from "../lib/customer-account-service";

const app = new cdk.App();

const theYear3000 = "3000-01-01 00:00:00";
const dev = "env-dev";

new CustomerIdentityService(app, StackName("CustomerIdentityService"), {
  env: {
    account: AccountValues.ACCOUNT_NUMBER,
    region: AccountValues.PREFERRED_REGION,
  },
  tags: {
    application: AccountValues.APPLICATION_NAME,
    "creation date": "2024-05-16 16:00:00",
    criticality: "criticality-required",
    "data scope": "data-privileged",
    environment: dev,
    "expiry date": theYear3000,
  },
});

new CustomerAccountService(app, StackName("CustomerAccountService"), {
  env: {
    account: AccountValues.ACCOUNT_NUMBER,
    region: AccountValues.PREFERRED_REGION,
  },
  tags: {
    application: AccountValues.APPLICATION_NAME,
    "creation date": "2024-06-04 16:00:00",
    criticality: "criticality-required",
    "data scope": "data-privileged",
    environment: dev,
    "expiry date": theYear3000,
  },
});
