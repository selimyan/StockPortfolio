const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const { User } = require('../db/models')
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

    const link = {
      name: 'Link',
      email: 'link@email.com',
      password: 'zelda'
    }

    it('POST /api/auth/signup returns a new user', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send(zelda)
        .expect(200)

      // console.log('RESS', res.body)
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Zelda')
    })

    it('POST /api/auth/signup requires unique email', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send(zelda)
        .expect(200)

      const res = await request(app)
        .post('/api/auth/signup')
        .send(link)
        .expect(401)

      console.log('2222RESS', res.body)
      expect(res.body.error).to.be.equal('User already exists')
    })
  })
})