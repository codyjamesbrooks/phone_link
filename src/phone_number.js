function validatePhoneNumber(number) {
  const phoneREGEX = new RegExp(/^(\+)?(\d{1,2})?\s?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/)
  return phoneREGEX.test(number)
}

function parsePhoneNumber(number) {
  const phoneREGEX = new RegExp(/^(\+)?(\d{1,2})?\s?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/)
  let matchGroups = number.match(phoneREGEX)
  return ({
    escape: matchGroups[1] ?? "None",
    country: matchGroups[2] ?? "None",
    area: matchGroups[3],
    tel: matchGroups[4],
    line: matchGroups[5]
  })
}

function formatPhoneNumber(parsedNumber) {
  let formattedPhone = "";
  formattedPhone += parsedNumber.escape != "None" ? parsedNumber.escape : "";
  formattedPhone += parsedNumber.country != "None" ? `${parsedNumber.country} ` : ""
  formattedPhone += `(${parsedNumber.area}) ${parsedNumber.tel}-${parsedNumber.line}`
  return formattedPhone
}







function phoneNumberObject(number) {
  this.number = number;
  this.phoneREGEX = new RegExp(/^(\+)?(\d{1,2})?\s?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/)
  this.valid = function() {
    return this.phoneREGEX.test(this.number)
  }

  this.parseNumber = function() {
    let matchGroups = this.number.match(this.phoneREGEX)
    let parts = {}
    if (matchGroups) {
      parts.escapeCode = matchGroups[1] ?? "None",
      parts.countryCode = matchGroups[2] ?? "None",
      parts.areaCode = matchGroups[3]
      parts.telPrefix = matchGroups[4]
      parts.lineNumber = matchGroups[5]
    }
    return parts;
  }

  this.format = function() {
    let phoneParts = this.parseNumber()
    let formatedNumber = ""
    formatedNumber += this.formatEscapeAndCountryCode(phoneParts)
    formatedNumber += `(${phoneParts.areaCode}) ${phoneParts.telPrefix}-${phoneParts.lineNumber}`
    return formatedNumber
  }

  this.formatEscapeAndCountryCode= function(parsedPhone) {
    let escape = parsedPhone.escapeCode != "None" ? parsedPhone.escapeCode : ""
    let country = parsedPhone.countryCode != "None" ? parsedPhone.countryCode : ""
    if (escape && country) {
      return `${escape}${country} `
    } else if (country) {
      return `${country} `
    } 
    return escape
  }
}

export { phoneNumberObject, validatePhoneNumber, parsePhoneNumber, formatPhoneNumber }