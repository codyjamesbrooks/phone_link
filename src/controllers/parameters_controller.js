import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ 'output' ]

  initialize() {
    let params = new URLSearchParams(document.location.search)
    this.number = params.get('number')
    this.setOutputHTML()
    this.setLink()
  }

  setOutputHTML() {
    this.outputTarget.innerHTML = this.number
  }

  setLink() {

  }
}