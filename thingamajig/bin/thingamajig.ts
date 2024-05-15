#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ThingamajigStack } from "../lib/thingamajig-stack";

const app = new cdk.App();
const CDK_DEFAULT_ACCOUNT = "654654391715";
const CDK_DEFAULT_REGION = "eu-west-2";

// Definition of top-level application "stack".
new ThingamajigStack(app, "ThingamajigStack", {
  env: { account: CDK_DEFAULT_ACCOUNT, region: CDK_DEFAULT_REGION },
});
