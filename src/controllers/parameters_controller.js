import { Controller } from "@hotwired/stimulus";
import { PhoneNumber } from "../phone_number";

export default class extends Controller {
  static targets = [ 'banner', 'link', 'embed' ]
  static values = { number: String, country: String, escape: String, 
                    ext: String, pause: String }

  initialize() {
    let params = new URLSearchParams(document.location.search)
    this.numberValue = params.get('number')
    this.numberObject = new PhoneNumber(params.get('number'), 
                                        this.countryValue, 
                                        this.escapeValue,
                                        this.extValue, 
                                        this.pauseValue)
    this.numberValue= new PhoneNumber(params.get('number'))
    this.updateDisplays()
  }

  updateDisplays() {
    this.bannerTarget.innerHTML = this.numberObject.to_s()
    this.linkTarget.innerHTML = this.numberObject.to_s()
    this.linkTarget.setAttribute("href", this.numberObject.to_link())
    this.embedTarget.innerHTML = `${this.numberObject.to_link()}>\n${this.numberObject.to_s()}`
  }
}