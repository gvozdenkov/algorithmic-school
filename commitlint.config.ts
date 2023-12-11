import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint or !!! use "npm run cz / yarn cz" for step by step commit guide creation',
};

export default Configuration;
