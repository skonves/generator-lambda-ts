import * as Generator from 'yeoman-generator';
import { join } from 'path';

module.exports = class extends Generator {
  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    if (this.pkg && Object.keys(this.pkg).length) {
      console.log('Found existing package.json:');
      console.log(this.pkg);
    }

    this.option('travis', {
      type: Boolean,
      default: false,
      description: 'Adds example code and tests to the project',
      alias: 'travisci',
    });
  }

  writing() {
    [
      // Root
      '.gitignore',
      '.nycrc',
      '.prettierrc',
      'tsconfig.json',
      'tslint.json',

      // Source
      join('src', 'index.ts'),
      join('src', 'index.tests.ts'),
    ].forEach(file => {
      this.fs.copy(
        this.templatePath(file + '.template'),
        this.destinationPath(file),
      );
    });

    console.log({ travis: this.options.travis });

    if (this.options.travis) {
      ['.travis.yml'].forEach(file => {
        this.fs.copy(
          this.templatePath(file + '.template'),
          this.destinationPath(file),
        );
      });
    }

    ['package.json', 'README.md'].forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file + '.template'),
        this.destinationPath(file),
        {
          name: this.pkg.name || 'aws-lambda-function',
          version: this.pkg.version || '0.0.1',
          description:
            this.pkg.description ||
            'Basic AWS Lambda function written in Typescript',
          author: this.pkg.author || '',
          license: this.pkg.license || 'ISC',
        },
      );
    });
  }

  install() {
    this.npmInstall(
      [
        '@types/aws-lambda',
        '@types/chai',
        '@types/mocha',
        '@types/node',
        'chai',
        'mocha',
        'nyc',
        'prettier',
        'source-map-support',
        'ts-node',
        'tslint',
        'typescript@3',
      ],
      { 'save-dev': true },
    );
  }

  private pkg: {
    name: string;
    version: string;
    description: string;
    author: string;
    license: string;
  };
};
