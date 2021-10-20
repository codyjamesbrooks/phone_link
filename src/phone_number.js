function phoneNumberObject(number) {
  this.number = number
  this.phoneREGEX = new RegExp(/^(\+)?(\d{1,2})?\s?(\(?(\d{3})\)?)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/)

  this.valid = function() {
    return this.phoneREGEX.test(this.number)
  }

  this.parseNumber = function() {
    let matchGroups = this.number.match(this.phoneREGEX)
    let parts = {}
    if (matchGroups) {
      parts.escapeCode = matchGroups[1] ?? "None",
      parts.countryCode = matchGroups[2] ?? "None",
      parts.areaCode = matchGroups[4] ?? "None",
      parts.telPrefix = matchGroups[5] ?? "None",
      parts.lineNumber = matchGroups[6] ?? "None"
    }
    return parts;
  }

  this.format = function() {
    let phoneParts = this.parseNumber()
    let formatedNumber = ""
    formatedNumber += this.formatEscapeAndCountryCode(phoneParts)
    if (phoneParts.areaCode != "None") {
      formatedNumber += `(${phoneParts.areaCode}) `
    }
    formatedNumber += `${phoneParts.telPrefix}-${phoneParts.lineNumber}`
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

export default phoneNumberObject 