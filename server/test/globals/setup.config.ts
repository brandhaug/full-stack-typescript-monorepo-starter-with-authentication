import path from 'path'

require('dotenv').config({ path: path.join(__dirname, '/../../../.env') })

beforeAll(async () => {
  // jest.resetModules()
  // console.log('SETUP')
  // if (!process.env.DATABASE_URL) return
  // process.env.DATABASE_URL = process.env.DATABASE_URL.replace('public', 'test')
  // console.log(process.env.DATABASE_URL)
})

afterAll(async () => {
  // await Database.pool.end()
  // console.log('teardown', process.env.DATABASE_URL)
  // await Database.query(`DROP DATABASE test`)
  // await prismaClient.$disconnect()
})
