module.exports = {
  locales: ['en', 'no'],
  output: 'src/translations/$LOCALE.json',
  keySeparator: ';',
  defaultValue: (locale, namespace, key) => locale === 'en' ? key : ''
}
