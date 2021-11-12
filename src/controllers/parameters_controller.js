import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ 'output', 'callLink', 'embedPreview' ]

  initialize() {
    let params = new URLSearchParams(document.location.search)
    this.number = params.get('number')
    this.updateOutputHTML()
    this.updateLink()
    this.updateEmbedPreview()
  }

  updateOutputHTML() {
    this.outputTarget.innerHTML = this.number
  }

  updateLink() {
    this.callLinkTarget.innerHTML = this.number
    let phoneHref = `tel:+1${this.number.replace(/[^+\d]/g, "")}`
    this.callLinkTarget.setAttribute("href", phoneHref)
  }

  updateEmbedPreview() {
    this.embedPreviewTarget.innerHTML = `+1${this.number.replace(/[^+\d]/g, "")}`
  }
}