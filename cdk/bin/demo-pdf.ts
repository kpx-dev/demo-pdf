#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DemoPdfStack } from '../../cdk/lib/demo-pdf-stack';

const app = new cdk.App();
new DemoPdfStack(app, 'demo-pdf-stack', {});
