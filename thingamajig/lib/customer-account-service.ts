import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { IVpc, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  SubnetGroup,
} from "aws-cdk-lib/aws-rds";
import { AccountValues } from "../magic-strings";

export class CustomerAccountService extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dbSubnetGroup = SubnetGroup.fromSubnetGroupName(
      this,
      "DatabaseSubnetGroup",
      AccountValues.RDS_DATABASE_SUBNET_GROUP_NAME
    );

    const devVpc = Vpc.fromLookup(this, "DevVpc", {
      vpcId: AccountValues.DEV_VPC_ID,
    });

    // const database = new DatabaseInstance(this, "CustomerAccounts", {
    //   engine: DatabaseInstanceEngine.MYSQL,
    //   credentials: Credentials.fromGeneratedSecret("thingamajigAdmin"),
    //   vpc: devVpc,
    //   subnetGroup: dbSubnetGroup,
    // });
  }
}
