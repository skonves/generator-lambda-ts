# Typescript AWS Lambda Function Generator

The Galaxy's OKest Typescript AWS Lambda Generator for [Yeoman](https://yeoman.io)

- Typescript 3
- Code formatting with Prettier and TSLint
- Unit testing with Mocha and Chai
- Code coverage with NYC
- Optional Travis CI config

## How To:

### Create a new AWS Lambda function

1.  Globally install this generator: `npm install -g generator-lambda-ts`
1.  From the root of your new project, run `yo ts-lambda` (NOTE: run `yo ts-lambda --help` for options)

### Add Travic CI config

1.  Pass the `travis` option: `yo ts-lambda --travis`
