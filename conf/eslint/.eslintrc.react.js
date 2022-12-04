module.exports = {
  extends: ['./.eslintrc.base.js', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'multiline-ternary': 'off',
    '@typescript-eslint/no-misused-promises': 'off'
  }
}
