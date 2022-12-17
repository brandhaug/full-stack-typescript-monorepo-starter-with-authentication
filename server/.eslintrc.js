module.exports = {
  extends: ['./node_modules/@fstmswa/conf/eslint/.eslintrc.node.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 'off'
  }
}
