import { Controller } from "@hotwired/stimulus";
import { AsYouType } from "libphonenumber-js";

export default class extends Controller {
  static values = { number: String}

  format() {
    this.element.value = new AsYouType('US').input(this.element.value)
  }

  numberValueChanged() {
    this.element.value = this.numberValue.replace(/^(\d{3})(\d{1,3})(\d{1,4})/, '($1) $2-$3')
  }
}