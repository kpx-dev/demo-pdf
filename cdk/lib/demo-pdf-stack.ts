import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as path from 'path';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import { Duration } from '@aws-cdk/core';

export class DemoPdfStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'ddb-table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    });

    const pdfBucket = new s3.Bucket(this, 'pdf-bucket');

    // const pdfLambda = new lambda.DockerImageFunction(this, 'pdf-lambda', {
    //   // timeout: Duration.seconds(30),
    //   memorySize: 128,
    //   environment: {
    //     S3_BUCKET: pdfBucket.bucketName
    //   },
    //   code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, "..", ".."), {
    //   }),
    // });

    const createPdfLambda = new lambda.Function(this, 'create-pdf-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'src/create-pdf-lambda/app.handler',
      timeout: Duration.seconds(30),
      environment: {
        S3_BUCKET: pdfBucket.bucketName,
        DDB_TABLE: table.tableName
      },
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'src', 'create-pdf-lambda')),
    });
    pdfBucket.grantReadWrite(createPdfLambda);

    // const getPdfLambda = new lambda.Function(this, 'get-pdf-lambda', {
    //   runtime: lambda.Runtime.NODEJS_14_X,
    //   handler: 'src/create-pdf-lambda/app.handler',
    //   timeout: Duration.seconds(30),
    //   environment: {
    //     S3_BUCKET: pdfBucket.bucketName,
    //     DDB_TABLE: table.tableName
    //   },
    //   code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'src', 'create-pdf-lambda')),
    // });
    // pdfBucket.grantReadWrite(createPdfLambda);

    // new apigateway.LambdaRestApi(this, 'pdf-api', {
    //   handler: pdfLambda,
    // });
  }
}
