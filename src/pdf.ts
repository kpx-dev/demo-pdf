// import { S3 } from '@aws-sdk/client-s3';
import * as faker from 'faker';
import * as getStream from 'get-stream';
import * as pdfkit from 'pdfkit';

// const s3Client = new S3({});

exports.lambdaHandler = async () => {
  // await s3Client.createBucket(params);

  const doc = new pdfkit();
  const randomName = faker.name.findName();

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

  doc.text(faker.name.findName(), { align: 'right' });
  doc.end();

  const pdfBuffer = await getStream.buffer(doc);
  const pdfBase64 = pdfBuffer.toString('base64');

  const response = {
    statusCode: 200,
    headers: {
      'Content-Length': Buffer.byteLength(pdfBase64),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=test.pdf',
    },
    isBase64Encoded: true,
    body: pdfBase64,
  };

  return response;
};
