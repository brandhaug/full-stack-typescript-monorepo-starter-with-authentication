module.exports = {
  extends: ['./node_modules/@full-stack-typescript-monorepo-starter-with-authentication/conf/eslint/.eslintrc.react.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  ],
  rules: {}
}
