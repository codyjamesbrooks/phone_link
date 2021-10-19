import { Controller } from "@hotwired/stimulus";
import { phoneNumberObject as phoneNumber } from "../phone_number";

export default class extends Controller {
  static values = { escape: String, 
                    country: String,
                    area: String,
                    tel: String, 
                    line: String, }
  static classes = [ 'hidden' ]
  static targets = [ 'number', 'message', 'generatedLink', 'numberInfo', 
                     'escape', 'country', 'area', 'tel', 'line'];
  
             
  get number() {
    return this.numberTarget.value.replace(/[^\d\+]/g, '')
  }
  get numberInfo() {
    return this.numberInfoTarget;
  }
  get message() {
    return this.messageTarget;
  }
  get generatedLink() {
   return this.generatedLinkTarget;
  }

  hideElements(...elements) {
    elements.forEach((element) => element.classList.add(this.hiddenClass))
  }
  revalElements(...elements) {
    elements.forEach((element) => element.classList.remove(this.hiddenClass))
  }

  telValueChanged(value) {
    this.telTarget.innerHTML = `Tel Prefix:   ${value}`
  }
  lineValueChanged(value) {
    this.lineTarget.innerHTML = `Line Number:   ${value}`
  }
  areaValueChanged(value) {
    this.areaTarget.innerHTML = `Area Code: ${value}`
  }
  countryValueChanged(value) {
    this.countryTarget.innerHTML = `Country Code: ${value}`
  }
  escapeValueChanged(value) {
    this.escapeTarget.innerHTML = `Escape Code: ${value}`
  }

  change() {
    let potentialNumber = new phoneNumber(this.number)
    this.updateMessageDisplay()

    if (potentialNumber.valid()) {
      // get & set the phone number info
      let phoneInfo = potentialNumber.parseNumber()
      this.setPhoneNumberInformation(phoneInfo)
      
      // create the phone link
      let formattedPhoneNumber = potentialNumber.format()
      this.createPhoneLink(formattedPhoneNumber)

      this.revalElements(this.generatedLink, this.numberInfo)
    } else {
      // Phone number isn't valid yet. 
      this.hideElements(this.generatedLink, this.numberInfo)
    }
  }

  setPhoneNumberInformation(phoneInfo) {
    if (phoneInfo.lineNumber != this.lineValue) { this.lineValue= phoneInfo.lineNumber }
    if (phoneInfo.telPrefix!= this.telValue) { this.telValue= phoneInfo.telPrefix}
    if (phoneInfo.areaCode!= this.areaValue) { this.areaValue= phoneInfo.areaCode }
    if (phoneInfo.countryCode!= this.countryValue) { this.countryValue = phoneInfo.countryCode }
    if (phoneInfo.escapeCode!= this.escapeValue) { this.escapeValue= phoneInfo.escapeCode }
  }

  updateMessageDisplay() {
    if (this.number.length === 0) {
      this.message.innerHTML = "Enter phone number"
    } else if (this.number.length <= 6) {
      this.message.innerHTML = "Continue to input the phone number"
    } else if (this.number.length <= 12) {
      this.message.innerHTML = "That's a start, lets see what you got"
    } else if (this.number.length === 13) {
      this.message.interHTML = "One heck of a link you got there"
    }
  }

  createPhoneLink(fomattedPhoneNumber) {
    this.generatedLink.setAttribute("href", `tel:${this.number}`);
    this.generatedLink.innerHTML = fomattedPhoneNumber
  }
}