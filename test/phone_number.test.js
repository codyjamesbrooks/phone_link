import { validatePhoneNumber, parsePhoneNumber, formatPhoneNumber } from "../src/phone_number";

describe('Testing for validatePhoneNumber', () => {
  describe("it doesn't require escape or country codes", () => {
    [ { input: ['1234567890'], output: true },
      { input: ['123.456.7890'], output: true },
      { input: ['(123) 456-7890'], output: true },
      { input: ['(123)456-7890'], output: true },
      { input: ['123 456 7890'], output: true },
      { input: ['123 456-7890'], output: true },
    ].forEach(({ input, output }) => {
      it(`recognizes ${input} as valid`, () => {
        expect(validatePhoneNumber(input)).toBe(output)
      })
    })
  })
  describe("it requires 10 digits", () => {
    [ { input: ['234567890'], output: false },
      { input: ['13.456.7890'], output: false },
      { input: ['(123) 56-7890'], output: false },
      { input: ['(123)45-7890'], output: false },
      { input: ['123 456 890'], output: false },
      { input: ['123 456-789'], output: false },
    ].forEach(({ input, output }) => {
      it(`recognizes ${input} as invalid`, () => {
        expect(validatePhoneNumber(input)).toBe(output)
      })
    })
  })
  describe("it accepts a wide variety of country codes/formats up to three digits", () => {
    [ { input: ['11234567890'], output: true },
      { input: ['2123.456.7890'], output: true },
      { input: ['13 (123) 456-7890'], output: true },
      { input: ['16(123)456-7890'], output: true },
      { input: ['123 123 456 7890'], output: true },
      { input: ['123 123 456-7890'], output: true },
    ].forEach(({ input, output }) => {
      it(`recognizes ${input} as invalid`, () => {
        expect(validatePhoneNumber(input)).toBe(output)
      })
    })    
  })
  describe("it accepts the + escape char without a country code", () => {
    [ { input: ['+1234567890'], output: true },
      { input: ['+123.456.7890'], output: true },
      { input: ['+(123) 456-7890'], output: true },
      { input: ['+(123)456-7890'], output: true },
      { input: ['+123 456 7890'], output: true },
      { input: ['+123 456-7890'], output: true },
    ].forEach(({ input, output }) => {
      it(`recognizes ${input} as invalid`, () => {
        expect(validatePhoneNumber(input)).toBe(output)
      })
    })     
  })
})
describe("Testing for parsePhoneNumber", ()=> {
  describe("it correctly parses phone numbers witout escape/counry code", ()=> {
    [ { input: '1234567890', output: { escape: "None", country: "None", area: "123", tel: "456", line: "7890" } },
      { input: '123.456.7890', output: { escape: "None", country: "None", area: "123", tel: "456", line: "7890" } },
      { input: '(123) 456-7890', output: { escape: "None", country: "None", area: "123", tel: "456", line: "7890" } },
      { input: '(123)456-7890', output: { escape: "None", country: "None", area: "123", tel: "456", line: "7890" } },
      { input: '123 456 7890', output: { escape: "None", country: "None", area: "123", tel: "456", line: "7890" } },
      { input: '123 456-7890', output: { escape: "None", country: "None", area: "123", tel: "456", line: "7890" } },
    ].forEach(({ input, output }) => {
      it(`recognizes ${input} as valid input`, () => {
        expect(parsePhoneNumber(input)).toEqual(output)
      })
    })
  })
  describe("it correctly parses phone numbers a wide variety of country codes and formats", () => {
      [ { input: '11234567890', output: { escape: "None", country: "1", area: "123", tel: "456", line: "7890" } },
      { input: '2123.456.7890', output: { escape: "None", country: "2", area: "123", tel: "456", line: "7890" } },
      { input: '13 (123) 456-7890', output: { escape: "None", country: "13", area: "123", tel: "456", line: "7890" } },
      { input: '16(123)456-7890', output: { escape: "None", country: "16", area: "123", tel: "456", line: "7890" } },
      { input: '123 123 456 7890', output: { escape: "None", country: "123", area: "123", tel: "456", line: "7890" } },
      { input: '123 123 456-7890', output: { escape: "None", country: "123", area: "123", tel: "456", line: "7890" } },
    ].forEach(({ input, output }) => {
      it(`recognizes ${input} as invalid`, () => {
        expect(parsePhoneNumber(input)).toEqual(output)
      })
    })   
  })
  describe("it correctly parses phone numbers when escape code is included without country", () => {
    [ { input: '+1234567890', output: { escape: "+", country: "None", area: "123", tel: "456", line: "7890" } },
    { input: '+123.456.7890', output: { escape: "+", country: "None", area: "123", tel: "456", line: "7890" } },
    { input: '+(123) 456-7890', output: { escape: "+", country: "None", area: "123", tel: "456", line: "7890" } },
    { input: '+(123)456-7890', output: { escape: "+", country: "None", area: "123", tel: "456", line: "7890" } },
    { input: '+123 456 7890', output: { escape: "+", country: "None", area: "123", tel: "456", line: "7890" } },
    { input: '+123 456-7890', output: { escape: "+", country: "None", area: "123", tel: "456", line: "7890" } },
    ].forEach(({ input, output }) => {
      it(`recognizes ${input} as invalid`, () => {
      expect(parsePhoneNumber(input)).toEqual(output)
      })
    })   
  })
})
describe("Testing for formatPhoneNumber", () => {
  it("it correctly formats a phone number without escape/country code", () => {
    const parsedNumber = { escape: "None", country: "None", area: "123", tel: "456", line: "7890" };
    expect(formatPhoneNumber(parsedNumber)).toBe("(123) 456-7890");
  })
  it("it correctly formats a phone number with a country code", () => {
    const parsedNumber = { escape: "None", country: "1", area: "123", tel: "456", line: "7890" };
    expect(formatPhoneNumber(parsedNumber)).toBe("1 (123) 456-7890");
  })
  it("it includes an escape code without a country code", () => {
    const parsedNumber = { escape: "+", country: "None", area: "123", tel: "456", line: "7890" };
    expect(formatPhoneNumber(parsedNumber)).toBe("+(123) 456-7890")
  })
})
