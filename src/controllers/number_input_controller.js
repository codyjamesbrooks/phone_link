import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { number: String }
  static targets = [ 'input', 'current' ]
  
  numberValueChanged(value) {
    this.currentTarget.innerHTML = value;
  }

  inputChange() {
    this.numberValue= this.input;
  }

  get input() {
    return this.inputTarget.value;
  }
}