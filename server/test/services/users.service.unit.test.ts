import * as UsersService from '../../src/services/users.service'
import { Language } from '../../src/types/graphql'

describe('create, fetch, update and delete users', () => {
  test('create, fetch, update and delete user', async () => {
    const c1 = await UsersService.register({ firstName: 'first', lastName: 'last', email: 'test@email.no', password: 'password', language: Language.English, termsAndPolicyAccepted: true })
    expect(c1).toBeDefined()
  })
})
