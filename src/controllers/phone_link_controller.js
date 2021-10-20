import { Controller } from "@hotwired/stimulus";
import { validatePhoneNumber, parsePhoneNumber, formatPhoneNumber } from "../phone_number"; 

export default class extends Controller {
  static values = { escape: String, 
                    country: String,
                    area: String,
                    tel: String, 
                    line: String, }
  static classes = [ 'hidden' ]
  static targets = [ 'number', 'message', 'generatedLink', 'numberInfo', 
                     'escape', 'country', 'area', 'tel', 'line', 'arrow'];
  
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
    this.telTarget.innerHTML = value
  }
  lineValueChanged(value) {
    this.lineTarget.innerHTML = value
  }
  areaValueChanged(value) {
    this.areaTarget.innerHTML = value
  }
  countryValueChanged(value) {
    this.countryTarget.innerHTML = value
  }
  escapeValueChanged(value) {
    this.escapeTarget.innerHTML = value
  }

  change() {
    this.updateMessageDisplay()
    if (validatePhoneNumber(this.number)) {
      let parsedNumber = parsePhoneNumber(this.number)
      let formattedNumber = formatPhoneNumber(parsedNumber)

      this.setPhoneNumberInformation(parsedNumber)
      this.createPhoneLink(formattedNumber)

      this.revalElements(this.generatedLink, this.numberInfo, ...this.arrowTargets)
    } else {
      // Phone number isn't valid yet, so we hide the link, number info, and the arrows. 
      this.hideElements(this.generatedLink, this.numberInfo, ...this.arrowTargets)
    }
  }

  setPhoneNumberInformation(phoneInfo) {
    if (phoneInfo.line != this.lineValue) { this.lineValue= phoneInfo.line }
    if (phoneInfo.tel != this.telValue) { this.telValue= phoneInfo.tel}
    if (phoneInfo.area != this.areaValue) { this.areaValue= phoneInfo.area }
    if (phoneInfo.country != this.countryValue) { this.countryValue = phoneInfo.country }
    if (phoneInfo.escape != this.escapeValue) { this.escapeValue= phoneInfo.escape }
  }

  updateMessageDisplay() {
    if (this.number.length === 0) {
      this.message.innerHTML = "Enter phone number"
    } else if (this.number.length < 10) {
      this.message.innerHTML = "Keep going"
    } else if (this.number.length <= 12) {
      this.message.innerHTML = "click & call"
    } else if (this.number.length === 13) {
      this.message.interHTML = "One heck of a link you got there"
    }
  }

  createPhoneLink(fomattedPhoneNumber) {
    this.generatedLink.setAttribute("href", `tel:${this.number}`);
    this.generatedLink.innerHTML = fomattedPhoneNumber
  }
}