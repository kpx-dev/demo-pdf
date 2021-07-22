import * as AWS from 'aws-sdk';
import * as faker from 'faker';
import * as getStream from 'get-stream';
import * as pdfkit from 'pdfkit';
import * as fs from 'fs';

const s3Client = new AWS.S3();
const ddbClient = new AWS.DynamoDB.DocumentClient();

const S3_BUCKET = process.env.S3_BUCKET || "";
const DDB_TABLE = process.env.DDB_TABLE || "";

const handler = async () => {
  const doc = new pdfkit();
  // doc.pipe(fs.createWriteStream('demo-pdf.pdf'));
  const randomName = faker.name.findName();

  // look into templating for pdf
  // setup pdftk server? https://www.pdflabs.com/tools/pdftk-server/

  doc.text(randomName, { align: 'right' });
  doc.text(faker.address.streetAddress(), { align: 'right' });
  doc.text(faker.address.secondaryAddress(), { align: 'right' });
  doc.text(faker.address.zipCode() + ' ' + faker.address.city(), { align: 'right' });
  doc.moveDown();
  doc.text('Dear ' + randomName + ',');
  doc.moveDown();

  for (let i = 0; i < 3; i++) {
    doc.text(faker.lorem.paragraph());
    doc.moveDown();
  }

  doc.text('Sincerely,', { align: 'right' });
  doc.text(faker.name.findName(), { align: 'right' });
  doc.end();

  const fileName = `${faker.datatype.uuid()}.pdf`;
  const s3Params = {
    Body: doc,
    Bucket: S3_BUCKET,
    Key:  fileName
  };

  // console.log('s3 params ', params);
  const res = await s3Client.putObject(s3Params).promise();
  console.log(res);

  const ddbParams = {
    TableName: DDB_TABLE,
    Item: {
      id: fileName,
      s3_path: `s3://${S3_BUCKET}/${fileName}`
    }
  };

  const ddbRes = await ddbClient.put(ddbParams).promise();
  console.log('ddb res', ddbRes);

  // const pdfBuffer = await getStream.buffer(doc);
  // const pdfBase64 = pdfBuffer.toString('base64');
  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     'Content-Length': Buffer.byteLength(pdfBase64),
  //     'Content-Type': 'application/pdf',
  //     'Content-disposition': `attachment;filename=pdf-demo-${faker.datatype.uuid()}.pdf`,
  //   },
  //   isBase64Encoded: true,
  //   body: pdfBase64,
  // };

  // return response;
  return 'ok';
};

exports.handler = handler;
// handler();
