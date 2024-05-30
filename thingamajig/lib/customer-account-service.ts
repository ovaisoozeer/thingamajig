import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import { IVpc, Vpc } from "aws-cdk-lib/aws-ec2";

export class CustomerAccountService extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //TODO Add this DB to a private subnet
    // new rds.DatabaseInstance(this, "CustomerAccount", {
    //   engine: rds.DatabaseInstanceEngine.MYSQL,
    //   credentials: rds.Credentials.fromGeneratedSecret("thingamajigAdmin"),
    //   vpc,
    // });
  }
}
