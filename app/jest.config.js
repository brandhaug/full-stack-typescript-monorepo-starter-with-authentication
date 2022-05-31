module.exports = {
  transform: {
    '\\.graphql$': 'jest-transform-graphql',
    '^(?!.*\\.json$).*$': 'babel-jest'
  }
}
