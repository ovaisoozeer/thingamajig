import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// Declaration of top-level stack, with a construct within it (commented out)
// it can optionally include further stacks.
// e.g. new CustomerIam. This in turn can include a construct (AWS resource) within it.

// so, stacks are the logical unit of separation, which can be nested and referenced
export class ThingamajigStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ThingamajigQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
