/** Biome-ignore-all lint/performance/noNamespaceImport: infra, it's fine */
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// 1. Create an ECR repository to store the image
const repo = new awsx.ecr.Repository("ublock-filters-lambda-repo", {
  forceDelete: true,
});

// 2. Build the Docker image locally and push it to ECR
const image = new awsx.ecr.Image("ublock-filters-lambda-image", {
  context: "../",
  dockerfile: "../Dockerfile.lambda",
  platform: "linux/amd64",
  repositoryUrl: repo.url,
});

// 3. Create IAM role for Lambda
const role = new aws.iam.Role("lambda-role", {
  // Biome-ignore lint/style/useNamingConvention: AWS IAM policy keys use PascalCase
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: "lambda.amazonaws.com" }),
});

// eslint-disable-next-line no-new -- fine for pulumi
new aws.iam.RolePolicyAttachment("lambda-basic-execution", {
  policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
  role: role.name,
});

// 4. Create the Lambda Function using the pushed image
const lambda = new aws.lambda.Function("ublock-filters-lambda-func", {
  architectures: ["x86_64"],
  imageUri: image.imageUri,
  packageType: "Image",
  role: role.arn,
});

// 5. Create the public Function URL
const functionUrl = new aws.lambda.FunctionUrl("bun-lambda-url", {
  authorizationType: "NONE", // Makes the endpoint publicly accessible
  functionName: lambda.name,
});

export const lambdaArn = lambda.arn;
export const url = functionUrl.functionUrl;
