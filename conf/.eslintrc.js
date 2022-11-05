module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'eslint-config-standard-with-typescript', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:jest/recommended'],
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'graphql', 'jest'],
  env: {
    browser: true,
    node: true,
    es2021: true,
    'jest/globals': true
  },
  ignorePatterns: [
    'graphql.ts', // API types
    '.eslintrc.js',
    '*.config.ts',
    '*.config.js',
    'dist/**'
  ],
  rules: {
    'import/no-named-as-default-member': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
