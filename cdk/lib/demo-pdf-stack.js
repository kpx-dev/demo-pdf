"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoPdfStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const s3 = require("@aws-cdk/aws-s3");
const path = require("path");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const core_1 = require("@aws-cdk/core");
class DemoPdfStack extends cdk.Stack {
    constructor(scope, id, props) {
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
            timeout: core_1.Duration.seconds(30),
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
exports.DemoPdfStack = DemoPdfStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby1wZGYtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZW1vLXBkZi1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsOENBQThDO0FBQzlDLHNDQUFzQztBQUN0Qyw2QkFBNkI7QUFFN0Isa0RBQWtEO0FBRWxELHdDQUF5QztBQUV6QyxNQUFhLFlBQWEsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN6QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ2xELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1NBQ2xFLENBQUMsQ0FBQztRQUVILE1BQU0sU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFcEQseUVBQXlFO1FBQ3pFLHNDQUFzQztRQUN0QyxxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLHNDQUFzQztRQUN0QyxPQUFPO1FBQ1Asb0ZBQW9GO1FBQ3BGLFFBQVE7UUFDUixNQUFNO1FBRU4sTUFBTSxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUNyRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxtQ0FBbUM7WUFDNUMsT0FBTyxFQUFFLGVBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzdCLFdBQVcsRUFBRTtnQkFDWCxTQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVU7Z0JBQy9CLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzthQUMzQjtZQUNELElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQzFGLENBQUMsQ0FBQztRQUNILFNBQVMsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFMUMscUVBQXFFO1FBQ3JFLHlDQUF5QztRQUN6QyxrREFBa0Q7UUFDbEQsbUNBQW1DO1FBQ25DLG1CQUFtQjtRQUNuQix1Q0FBdUM7UUFDdkMsaUNBQWlDO1FBQ2pDLE9BQU87UUFDUCwrRkFBK0Y7UUFDL0YsTUFBTTtRQUNOLDZDQUE2QztRQUU3QyxrREFBa0Q7UUFDbEQsd0JBQXdCO1FBQ3hCLE1BQU07SUFDUixDQUFDO0NBQ0Y7QUFoREQsb0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnQGF3cy1jZGsvYXdzLXMzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgKiBhcyBjbG91ZHdhdGNoIGZyb20gJ0Bhd3MtY2RrL2F3cy1jbG91ZHdhdGNoJztcbmltcG9ydCB7IER1cmF0aW9uIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBEZW1vUGRmU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgJ2RkYi10YWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnaWQnLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwZGZCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdwZGYtYnVja2V0Jyk7XG5cbiAgICAvLyBjb25zdCBwZGZMYW1iZGEgPSBuZXcgbGFtYmRhLkRvY2tlckltYWdlRnVuY3Rpb24odGhpcywgJ3BkZi1sYW1iZGEnLCB7XG4gICAgLy8gICAvLyB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAvLyAgIG1lbW9yeVNpemU6IDEyOCxcbiAgICAvLyAgIGVudmlyb25tZW50OiB7XG4gICAgLy8gICAgIFMzX0JVQ0tFVDogcGRmQnVja2V0LmJ1Y2tldE5hbWVcbiAgICAvLyAgIH0sXG4gICAgLy8gICBjb2RlOiBsYW1iZGEuRG9ja2VySW1hZ2VDb2RlLmZyb21JbWFnZUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiKSwge1xuICAgIC8vICAgfSksXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCBjcmVhdGVQZGZMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdjcmVhdGUtcGRmLWxhbWJkYScsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgaGFuZGxlcjogJ3NyYy9jcmVhdGUtcGRmLWxhbWJkYS9hcHAuaGFuZGxlcicsXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFMzX0JVQ0tFVDogcGRmQnVja2V0LmJ1Y2tldE5hbWUsXG4gICAgICAgIEREQl9UQUJMRTogdGFibGUudGFibGVOYW1lXG4gICAgICB9LFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicsICdzcmMnLCAnY3JlYXRlLXBkZi1sYW1iZGEnKSksXG4gICAgfSk7XG4gICAgcGRmQnVja2V0LmdyYW50UmVhZFdyaXRlKGNyZWF0ZVBkZkxhbWJkYSk7XG5cbiAgICAvLyBjb25zdCBnZXRQZGZMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdnZXQtcGRmLWxhbWJkYScsIHtcbiAgICAvLyAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgIC8vICAgaGFuZGxlcjogJ3NyYy9jcmVhdGUtcGRmLWxhbWJkYS9hcHAuaGFuZGxlcicsXG4gICAgLy8gICB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAvLyAgIGVudmlyb25tZW50OiB7XG4gICAgLy8gICAgIFMzX0JVQ0tFVDogcGRmQnVja2V0LmJ1Y2tldE5hbWUsXG4gICAgLy8gICAgIEREQl9UQUJMRTogdGFibGUudGFibGVOYW1lXG4gICAgLy8gICB9LFxuICAgIC8vICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicsICdzcmMnLCAnY3JlYXRlLXBkZi1sYW1iZGEnKSksXG4gICAgLy8gfSk7XG4gICAgLy8gcGRmQnVja2V0LmdyYW50UmVhZFdyaXRlKGNyZWF0ZVBkZkxhbWJkYSk7XG5cbiAgICAvLyBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFSZXN0QXBpKHRoaXMsICdwZGYtYXBpJywge1xuICAgIC8vICAgaGFuZGxlcjogcGRmTGFtYmRhLFxuICAgIC8vIH0pO1xuICB9XG59XG4iXX0=