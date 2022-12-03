module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'eslint-config-standard-with-typescript',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'graphql', 'jest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off'
      }
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      parserOptions: {
        schema: '../server/src/schema.graphql',
        operations: ['**/*.graphql']
      },
      extends: ['plugin:@graphql-eslint/schema-recommended', 'plugin:@graphql-eslint/operations-recommended'],
      rules: {
        '@graphql-eslint/selection-set-depth': 'off'
      }
    }
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
    'jest/globals': true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: [
    'graphql.ts', // API types
    'dist/**'
  ],
  rules: {
    'import/no-named-as-default-member': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
}
