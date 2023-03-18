const sharedConfig = require('@fstmswa/conf/tailwind/tailwind.config')

module.exports = {
  ...sharedConfig,
  content: ['./src/**/*.{ts,tsx}', './node_modules/@fstmswa/ui/**/*.{ts,tsx}']
}
