import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ 'output', 'callLink' ]

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
    this.callLinkTarget.innerHTML = this.number
    let phoneHref = `tel:+1${this.number.replace(/[^+\d]/g, "")}`
    this.callLinkTarget.setAttribute("href", phoneHref)
  }
}