module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'eslint-config-standard-with-typescript', 'plugin:prettier/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:jest/recommended'],
  plugins: ['@typescript-eslint', 'import', 'prettier', 'graphql', 'jest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/strict'],
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
        operations: '../app/src/graphql/**/*.graphql'
      },
      extends: ['plugin:@graphql-eslint/schema-all', 'plugin:@graphql-eslint/operations-all'],
      rules: {
        '@graphql-eslint/selection-set-depth': 'off',
        '@graphql-eslint/match-document-filename': 'off',
        '@graphql-eslint/alphabetize': 'off',
        '@graphql-eslint/require-description': 'off',
        '@graphql-eslint/executable-definitions': 'off',
        '@graphql-eslint/strict-id-in-types': 'off', // Id is not required on payloads
        '@graphql-eslint/input-name': 'off', // Input as name is not required on context
        'spaced-comment': 'off'
      }
    }
  ],
  ignorePatterns: ['graphqlTypes.ts', 'graphqlOperations.ts', 'dist/**'],
  rules: {
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off'
  }
}
