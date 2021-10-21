export function validatePhoneNumber(number) {
  // note: this REGEX currently has some known limitiations. It is not perfect. I will note limitations here. 
  // There are many different phone number formats across this wide world. I tried to adhere to a general international 
  // formatting standards. With that being said I am alway open to improvement and would be happy to update it if it is unable to 
  // validate any users phone number. 
  // limitations:  
  // 1. It returns invalid for country codes that are long than 4 digits. That to my knowing that is a list
  //    of 26 different countries.
  const phoneREGEX = new RegExp(/^(\+)?(\d{1,3})?\s?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/)
  return phoneREGEX.test(number)
}

export function parsePhoneNumber(number) {
  const phoneREGEX = new RegExp(/^(\+)?(\d{1,3})?\s?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/)
  let matchGroups = number.match(phoneREGEX)
  return ({
    escape: matchGroups[1] ?? "None",
    country: matchGroups[2] ?? "None",
    area: matchGroups[3],
    tel: matchGroups[4],
    line: matchGroups[5]
  })
}

export function formatPhoneNumber(parsedNumber) {
  let formattedPhone = "";
  formattedPhone += parsedNumber.escape != "None" ? parsedNumber.escape : "";
  formattedPhone += parsedNumber.country != "None" ? `${parsedNumber.country} ` : ""
  formattedPhone += `(${parsedNumber.area}) ${parsedNumber.tel}-${parsedNumber.line}`
  return formattedPhone
}


// function phoneNumberObject(number) {
//   this.number = number;
//   this.phoneREGEX = new RegExp(/^(\+)?(\d{1,2})?\s?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/)
//   this.valid = function() {
//     return this.phoneREGEX.test(this.number)
//   }

//   this.parseNumber = function() {
//     let matchGroups = this.number.match(this.phoneREGEX)
//     let parts = {}
//     if (matchGroups) {
//       parts.escapeCode = matchGroups[1] ?? "None",
//       parts.countryCode = matchGroups[2] ?? "None",
//       parts.areaCode = matchGroups[3]
//       parts.telPrefix = matchGroups[4]
//       parts.lineNumber = matchGroups[5]
//     }
//     return parts;
//   }

//   this.format = function() {
//     let phoneParts = this.parseNumber()
//     let formatedNumber = ""
//     formatedNumber += this.formatEscapeAndCountryCode(phoneParts)
//     formatedNumber += `(${phoneParts.areaCode}) ${phoneParts.telPrefix}-${phoneParts.lineNumber}`
//     return formatedNumber
//   }

//   this.formatEscapeAndCountryCode= function(parsedPhone) {
//     let escape = parsedPhone.escapeCode != "None" ? parsedPhone.escapeCode : ""
//     let country = parsedPhone.countryCode != "None" ? parsedPhone.countryCode : ""
//     if (escape && country) {
//       return `${escape}${country} `
//     } else if (country) {
//       return `${country} `
//     } 
//     return escape
//   }
// }
