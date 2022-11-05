module.exports = {
  extends: ['./node_modules/@full-stack-typescript-monorepo-starter-with-authentication/conf/.eslintrc.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  }
}