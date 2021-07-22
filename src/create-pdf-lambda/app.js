const PDFDocument = require('pdfkit');
const faker = require('faker');
const getStream = require('get-stream');
const AWS = require('aws-sdk');
const fs = require('fs');

const s3Client = new AWS.S3({ region: 'us-east-1' });
const ddbClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const S3_BUCKET = process.env.S3_BUCKET || "";
const DDB_TABLE = process.env.DDB_TABLE || "";

const handler = async (event) => {

    const doc = new PDFDocument();

    const randomName = faker.name.findName();
    const fileName = `${faker.datatype.uuid()}.pdf`;

    doc.text(randomName, { align: 'right' });
    doc.text(faker.address.streetAddress(), { align: 'right' });
    doc.text(faker.address.secondaryAddress(), { align: 'right' });
    doc.text(faker.address.zipCode() + ' ' + faker.address.city(), { align: 'right' });
    doc.moveDown();
    doc.text('Dear ' + randomName + ',');
    doc.moveDown();
    for(let i = 0; i < 3; i++) {
        doc.text(faker.lorem.paragraph());
        doc.moveDown();
    }
    doc.text(faker.name.findName(), { align: 'right' });
    doc.pipe(fs.createWriteStream(fileName));
    doc.end();

    const s3Params = {
        Body: doc,
        Bucket: S3_BUCKET,
        Key:  fileName
    };

    const res = await s3Client.upload(s3Params).promise();
    console.log(res);

    const ddbParams = {
        TableName: DDB_TABLE,
        Item: {
        id: fileName,
        s3_path: `s3://${S3_BUCKET}/${fileName}`
        }
    };

    const ddbRes = await ddbClient.put(ddbParams).promise();
    // console.log('ddb res', ddbRes);
    return 'ok';

  // pdfBuffer = await getStream.buffer(doc);
    // pdfBase64 = pdfBuffer.toString('base64');

    // const response = {
    //     statusCode: 200,
    //     headers: {
    //         'Content-Length': Buffer.byteLength(pdfBase64),
    //         'Content-Type': 'application/pdf',
    //         'Content-disposition': 'attachment;filename=test.pdf'
    //     },
    //     isBase64Encoded: true,
    //     body: pdfBase64
    // };
    // console.log(response);
    // return response;
};
exports.handler = handler;
handler({});
