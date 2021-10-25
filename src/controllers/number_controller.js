import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { phone: String,
                    country: String,
                    escape: String } 
  static targets = [ 'escapePreview', 'countryPreview', 'phonePreview',
                     'escapeInput', 'countryInput', 'phoneInput',
                     'link'                                            ]

  connect() {
    this.escapePreviewTarget.innerHTML = "+"
  }

  phoneChange(event) {
    let number = this.phoneInputTarget.value.replaceAll(/[^\d]/g, "");
    let formatted = this.formatPhoneNumber(number)
    
    // reformat what the user entered
    this.phoneInputTarget.value = formatted;
    this.phoneValue = formatted;
  }

  countryChange(event) {
    this.countryValue = this.countryInputTarget.value
  }
  
  formatPhoneNumber(number) {
    if(number.length >= 7) {
      return number.replace(/(\d{3})(\d{3})(\d{1,4})/, '($1) $2-$3')
    } else if(number.length >= 4) {
      return number.replace(/(\d{3})(\d{1,3})/, '($1) $2')
    } else {
      return number
    }
  }
  
  phoneValueChanged(value) {
    this.phonePreviewTarget.innerHTML = this.phoneValue || '(123) 456-7890'
    this.phoneValue.length == 14 ? this.setPhoneLink() : this.disablePhoneLink()
  }
  
  setPhoneLink() {
    let linkText = `${this.escapeValue}${this.countryValue} ${this.phoneValue}`
    let linkHREF = `tel:${this.escapeValue}${this.countryValue}${this.phoneValue.replaceAll(/[^\d]/g, "")}`
    this.linkTarget.setAttribute("href", linkHREF)
    this.linkTarget.innerHTML = linkText
  }

  disablePhoneLink() {
    this.linkTarget.setAttribute("href", "#")
    this.linkTarget.innerHTML = "Enter valid number above"
  }

  countryValueChanged(value) {
    this.countryPreviewTarget.innerHTML = this.countryValue;
  }
}
