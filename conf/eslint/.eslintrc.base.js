module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'eslint-config-standard-with-typescript', 'plugin:prettier/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:jest/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/strict'],
      rules: {
        // '@typescript-eslint/no-unsafe-call': 'error',
        // '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/no-shadow': 'error',
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
    'no-nested-ternary': 'error',
    'no-restricted-globals': 'error',
    'no-else-return': 'error',
    'no-param-reassign': 'error',
    'prefer-destructuring': 'error',
    'prefer-template': 'error',
    'no-lonely-if': 'error',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off'
  }
}
