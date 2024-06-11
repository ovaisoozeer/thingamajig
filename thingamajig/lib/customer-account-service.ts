import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  IVpc,
  SecurityGroup,
  Vpc,
  InstanceType,
  InstanceSize,
  InstanceClass,
} from "aws-cdk-lib/aws-ec2";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  SubnetGroup,
} from "aws-cdk-lib/aws-rds";
import { AccountValues } from "../magic-strings";
import { RdsDataSource } from "aws-cdk-lib/aws-appsync";
import { Duration } from "aws-cdk-lib";

export class CustomerAccountService extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const devVpc = Vpc.fromLookup(this, "DevVpc", {
      vpcId: AccountValues.DEV_VPC_ID,
    });

    const dbSubnetGroup = SubnetGroup.fromSubnetGroupName(
      this,
      "DatabaseSubnetGroup",
      AccountValues.RDS_DATABASE_SUBNET_GROUP_NAME
    );

    const dbSecurityGroup = SecurityGroup.fromLookupByName(
      this,
      "DatabaseSecurityGroup",
      AccountValues.RDS_DATABASE_SECURITY_GROUP_NAME,
      devVpc
    );

    const database = new DatabaseInstance(this, "CustomerAccounts", {
      engine: DatabaseInstanceEngine.MYSQL,
      databaseName: "ThingamajigCustomerAccounts",
      credentials: Credentials.fromGeneratedSecret("thingamajigAdmin"),
      vpc: devVpc,
      subnetGroup: dbSubnetGroup,
      securityGroups: [dbSecurityGroup],
      availabilityZone: AccountValues.CDK_DEFAULT_REGION,
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
      backupRetention: Duration.days(30),
      allowMajorVersionUpgrade: true,
      allocatedStorage: 20,
    });
  }
}
