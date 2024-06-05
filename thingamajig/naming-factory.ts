import { ApplicationValues } from "./magic-strings";

// For independently deployable containers
// Appears in CF as a logical name for a stack
export function StackName(containerName: string): string {
  return `${ApplicationValues.APPLICATION_NAME}-${containerName}`;
}

// For components within a unit of deployment
// Appears in CF as a logical name for a stack - so should include the container stack name
export function NestedStackName(
  containerStackName: string,
  componentName: string
): string {
  return `${containerStackName}-${componentName}`;
}

// For resources within a component
export function ResourceName(stackName: string, constructName: string): string {
  return `${stackName}-${constructName}`;
}
