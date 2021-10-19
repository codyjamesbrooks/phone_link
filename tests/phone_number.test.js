
import phoneNumber from '../src/phone_number'


describe('Phone number valid method', ()=> {
    let numbers = [['1111111', true],
                   ['111.1111', true],]
    test.each(numbers)('should return true for %i', (number, expect) => {
      console.log(phoneNumber)
      expect(new phoneNumber(number).valid()).toBe(true)
    });
})