module.exports = {
  plugins: ['react-refresh'],
  extends: ['.eslintrc.base', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:eslint-plugin-tailwindcss/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    'jest/globals': true
  },
  rules: {
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/no-unstable-nested-components': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'multiline-ternary': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'react-refresh/only-export-components': 'error'
  }
}
