module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'eslint-config-standard-with-typescript', 'plugin:prettier/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:jest/recommended'],
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'graphql', 'jest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-inferrable-types': 'off'
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
  ignorePatterns: ['graphqlTypes.ts', 'graphqlOperations.ts', 'dist/**'],
  rules: {
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off'
  }
}
