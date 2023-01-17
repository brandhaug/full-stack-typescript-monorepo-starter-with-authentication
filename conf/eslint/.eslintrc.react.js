module.exports = {
  extends: ['.eslintrc.base', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:eslint-plugin-tailwindcss/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    "jest/globals": true
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'multiline-ternary': 'off',
    '@typescript-eslint/no-misused-promises': 'off'
  }
}
