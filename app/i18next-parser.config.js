module.exports = {
  locales: ['en', 'no'],
  output: 'src/assets/translations/$LOCALE.ts',
  keySeparator: ';',
  defaultValue: (locale, namespace, key) => locale === 'en' ? key : ''
}
