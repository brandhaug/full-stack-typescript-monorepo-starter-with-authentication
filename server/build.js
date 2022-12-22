require('esbuild').build({
  logLevel: 'info',
  platform: 'node',
  packages: 'external',
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/main.js'
})
