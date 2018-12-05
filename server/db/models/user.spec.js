const { expect } = require('chai')
const db = require('../index')
const { User } = require('../models')

describe('User model', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('user information', () => {
    let link

    beforeEach(async () => {
      link = await User.create({
        name: 'Link',
        email: 'link@email.com',
        password: 'zelda'
      })
    })
    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(link.correctPassword('zelda')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(link.correctPassword('Zelda')).to.be.equal(false)
      })
    })

    describe('initial cash for new users', () => {
      it('is 500000', () => {
        expect(link.cash).to.be.equal(500000)
      })
    })
  })

})