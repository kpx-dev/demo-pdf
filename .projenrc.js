const { AwsCdkTypeScriptApp } = require('projen');
const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: 'demo-pdf',

  /* Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. */
  // cdkDependencies: undefined,
  /* Runtime dependencies of this module. */
  deps: [
    '@aws-sdk/client-s3',
    'faker',
    'get-stream',
    'pdfkit',
  ],
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  /* Build dependencies for this module. */
  devDeps: [
    '@types/faker',
    '@types/pdfkit',
  ],
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});
project.synth();
