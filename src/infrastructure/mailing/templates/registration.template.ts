import * as fs from 'fs';
import * as path from 'path';

const pathTemplate = path.join(
  process.cwd(),
  '../../src/infrastructure/mailing/templates',
  'registration.template.html',
);

export const template = fs.readFileSync(pathTemplate, 'utf-8');
