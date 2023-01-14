const config = {
  overwrite: true,
  schema: '../server/src/schema.graphql',
  documents: '../app/src/graphql/**/*.graphql',
  generates: {
    './src/graphqlTypes.ts': {
      plugins: ['typescript']
    },
    '../server/src/types/graphqlTypes.ts': {
      preset: 'import-types',
      plugins: ['typescript-resolvers'],
      presetConfig: {
        typesPath: '@fstmswa/types'
      }
    },
    '../app/src/types/graphqlTypes.ts': {
      preset: 'import-types',
      plugins: ['typescript-operations'],
      config: {
        nonOptionalTypename: true,
        inlineFragmentTypes: 'combine'
      },
      presetConfig: {
        typesPath: '@fstmswa/types'
      }
    },
    '../app/src/types/graphqlOperations.ts': {
      preset: 'import-types',
      plugins: ['typescript-react-apollo'],
      config: {
        importOperationTypesFrom: 'Types'
      },
      presetConfig: {
        typesPath: './graphqlTypes'
      }
    }
  }
}

export default config
