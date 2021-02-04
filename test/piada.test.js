var expect = require('chai').expect
var request = require('request')

describe('Piadas', function () {
  describe('GET all piadas', function () {
    var url = 'http://localhost:5000/piadas'

    it('returns status 200', function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200)
        done()
      })
    })
  })

  describe('GET one piada', function () {
    var url = 'http://localhost:5000/piadas/5e962f77e4a20ae0efe047c0'

    it('returns status 200', function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200)
        done()
      })
    })

    it('returns the piada', function (done) {
      request(url, function (error, response, body) {
        expect(body).to.equal({
          category: [
            'animais'
          ],
          _id: '5e962f77e4a20ae0efe047c0',
          joke: 'Qual é o Animal que anda com as patas?',
          response: ' O Pato',
          createdAt: '2020-04-14T21:47:35.866Z',
          updatedAt: '2020-04-14T21:47:35.866Z',
          __v: 0
        })
        done()
      })
    })
  })
})
