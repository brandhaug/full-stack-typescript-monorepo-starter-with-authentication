import * as StringUtils from '../../src/utils/string.utils'

test('generate random string', () => {
  const a1 = StringUtils.randomString(7)
  const a2 = StringUtils.randomString(7)
  expect(a1).toBeDefined()
  expect(a1 === a2).toBeFalsy()
})
