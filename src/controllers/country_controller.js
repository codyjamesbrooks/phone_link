import { Controller } from "@hotwired/stimulus";
const countryCodeData = require('../../public/images/country_data.json')

export default class extends Controller {
  static targets = [ "countries" ]
  initialize() {
    for (const slug in countryCodeData) {
      let name = countryCodeData[slug]['country_name']
      let code = countryCodeData[slug]['country_code']
      this.countriesTarget.add(new Option(`${slug} - ${name}`, code));
    }
    // Add defualut selected state to the US option
    this.countriesTarget.options[227].selected = true
  }
}