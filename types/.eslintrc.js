module.exports = {
  extends: ['./node_modules/@fstmswa/conf/eslint/.eslintrc.base.js'],
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
