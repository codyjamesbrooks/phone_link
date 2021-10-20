const assert = require('assert');
import phoneNumber from '../src/phone_number.js'


describe('number .valid method', () => {
  describe('numbers without escape and country codes are valid', () => {
    let validNumbers = ['1234567890', '123-456-7890', '123.456.7890',
                        '123 456 7890', '(123) 456 789', '(123)456-789']
    console.log(phoneNumber)
    console.log(typeof phoneNumber)
    console.log(new phoneNumber)
    validNumbers.forEach((format) => {
      it(`returns true for number format ${format}`, () => {
        const numberObj = new phoneNumber(format)
        assert(numberObj.valid())
      })
    })
  })
})