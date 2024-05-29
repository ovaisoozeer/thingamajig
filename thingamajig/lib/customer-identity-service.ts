import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { ResourceName } from "../naming-factory";

export class CustomerIdentityService extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const name: string = ResourceName(id, "UserPool");
    const userPool = new cognito.UserPool(this, name, {
      userPoolName: name,
      accountRecovery: cognito.AccountRecovery.NONE,
      deletionProtection: false,
      customAttributes: {
        userType: new cognito.StringAttribute({
          mutable: true,
        }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      selfSignUpEnabled: false,
      signInAliases: {
        username: true,
      },
      signInCaseSensitive: false,
    });
  }
}
