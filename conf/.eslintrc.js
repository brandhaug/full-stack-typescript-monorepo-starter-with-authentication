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
    '*.config.js'
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'multiline-ternary': 'off',
    'prefer-regex-literals': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [
      'error'
    ],
    'import/no-named-as-default': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default-member': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
