const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

describe('Auth routes', () => {

  beforeEach(async () => {
    await db.sync({ force: true })
  })

  describe('/api/auth/signup', async () => {
    const zelda = {
      name: 'Zelda',
      email: 'zelda@email.com',
      password: 'link'
    }

    it('POST /api/auth/signup returns a new user', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send(zelda)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Zelda')
    })

  })
})