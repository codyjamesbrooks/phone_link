import { Controller } from "@hotwired/stimulus";
import { PhoneNumber } from "../phone_number";

export default class extends Controller {
  static targets = [ 'banner', 'link', 'embed', 'selectCountry', 'inputEscape', 'inputExt', 'inputPause']
  static values = { country: String, escape: String, 
                    ext: String, pause: Number }

  initialize() {
    this.update()
  }

  updateDisplays() {
    this.bannerTarget.innerHTML = this.numberObject.to_s()
    this.linkTarget.innerHTML = this.numberObject.to_s()
    this.linkTarget.setAttribute("href", this.numberObject.to_link())
    this.embedTarget.innerHTML = `${this.numberObject.to_link()}>\n${this.numberObject.to_s()}`
  }

  update() {
    let params = new URLSearchParams(document.location.search)
    this.numberObject = new PhoneNumber(params.get('number'),
                                        this.countryValue,
                                        this.escapeValue, 
                                        this.extValue, 
                                        this.pauseValue)
    this.updateDisplays()
  }
  changeCountry() {
    this.countryValue = this.selectCountryTarget.value
    this.update()
  }
  
  changeEscape() {
    this.escapeValue = this.inputEscapeTarget.value
    this.update()
  }

  changeExt() {
    this.extValue = this.inputExtTarget.value
    this.update()
  }
  
  changePause() {
    this.pauseValue = +this.inputPauseTarget.value
    this.update()
  }
}