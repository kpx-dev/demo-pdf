FROM amazon/aws-lambda-nodejs:14

COPY src.js package*.json ./

RUN npm install

CMD [ "app.lambdaHandler" ]
