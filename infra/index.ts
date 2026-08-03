/** biome-ignore-all lint/performance/noNamespaceImport: infra, it's fine */
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// 1. Create an ECR repository to store the image
const repo = new awsx.ecr.Repository("ublock-filters-lambda-repo", {
  forceDelete: true,
});

// 2. Build the Docker image locally and push it to ECR
const image = new awsx.ecr.Image("ublock-filters-lambda-image", {
  repositoryUrl: repo.url,
  context: "../",
  dockerfile: "../Dockerfile.lambda",
  platform: "linux/amd64",
});

// 3. Create IAM role for Lambda
const role = new aws.iam.Role("lambda-role", {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: "lambda.amazonaws.com" }),
});

// biome-ignore lint/correctness/noUnusedInstantiation: fine for pulumi
new aws.iam.RolePolicyAttachment("lambda-basic-execution", {
  role: role.name,
  policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
});

// 4. Create the Lambda Function using the pushed image
const lambda = new aws.lambda.Function("ublock-filters-lambda-func", {
  packageType: "Image",
  imageUri: image.imageUri,
  role: role.arn,
  architectures: ["x86_64"],
});

// 5. Create the public Function URL
const functionUrl = new aws.lambda.FunctionUrl("bun-lambda-url", {
  functionName: lambda.name,
  authorizationType: "NONE", // Makes the endpoint publicly accessible
});

export const lambdaArn = lambda.arn;
export const url = functionUrl.functionUrl;
