import { Controller } from "@hotwired/stimulus";
const countryCodeData = require('../../public/images/country_data.json')

export default class extends Controller {
  static targets = [ "output" ]
  initialize() {
    for (const slug in countryCodeData) {
      let name = countryCodeData[slug]['country_name']
      let code = countryCodeData[slug]['country_code']
      if (name == 'United States') {
        console.log('us')
        this.element.add(new Option(`${slug} - ${name} - ${code}`, code, true, true))
      } else {
        this.element.add(new Option(`${slug} - ${name} - ${code}`, code));
      }
    }
  }
}