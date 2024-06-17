import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  SecurityGroup,
  Vpc,
  InstanceType,
  InstanceSize,
  InstanceClass,
  Subnet,
} from "aws-cdk-lib/aws-ec2";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  DatabaseProxy,
  ProxyTarget,
  SubnetGroup,
} from "aws-cdk-lib/aws-rds";
import { AccountValues } from "../magic-strings";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

export class CustomerAccountService extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const devVpc = Vpc.fromLookup(this, "DevVpc", {
      vpcId: AccountValues.DEV_VPC_ID,
    });

    const vpcSubnet1 = Subnet.fromSubnetId(
      this,
      "privateSubnet1",
      AccountValues.DEV_VPC_PRIVATE_SUBNET_1_ID
    );

    const vpcSubnet2 = Subnet.fromSubnetId(
      this,
      "privateSubnet2",
      AccountValues.DEV_VPC_PRIVATE_SUBNET_2_ID
    );

    const subnetGroupName = "ThingamajigCustomerAccountsDBSubnetGroup";
    const dbSubnetGroup = new SubnetGroup(
      this,
      "CustomerAccountsDBSubnetGroup",
      {
        subnetGroupName: subnetGroupName,
        description: "Subnet group for thingamajig customer accounts db",
        vpc: devVpc,
        vpcSubnets: {
          // onePerAz: true,
          // subnetGroupName: subnetGroupName,
          subnets: [vpcSubnet1, vpcSubnet2],
          // subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      }
    );

    const dbSecurityGroup = SecurityGroup.fromLookupByName(
      this,
      "DevDatabaseSecurityGroup",
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
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const dbProxySecret: Secret = new Secret(
      this,
      "CustomerAccountsDBProxySecret",
      {
        description: "Secret for rds proxy to thingamajig customer accounts db",
        removalPolicy: RemovalPolicy.DESTROY,
        secretName: "customer-accounts-db-proxy-secret",
      }
    );

    const dbProxy = new DatabaseProxy(this, "CustomerAccountsDBProxy", {
      proxyTarget: ProxyTarget.fromInstance(database),
      secrets: [dbProxySecret],
      securityGroups: [dbSecurityGroup],
      vpc: devVpc,
    });

    const restApiHandler = new lambda.Function(
      this,
      "CustomerAccountsApiHandler",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromAsset("lambda"),
        handler: "customer-account-service.restApi",
      }
    );

    const restApi: LambdaRestApi = new LambdaRestApi(
      this,
      "CustomerAccountsApi",
      {
        handler: restApiHandler,
        restApiName: "CustomerAccountsApi",
      }
    );

    // dbProxy.grantConnect(restApiHandler);
  }
}
