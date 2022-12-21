module.exports = {
  extends: ['.eslintrc.base', 'plugin:node/recommended'],
  env: {
    node: true
  },
  rules: {
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }]
  },
  settings: {
    node: {
      tryExtensions: ['.js', '.ts', '.d.ts']
    }
  }
}
