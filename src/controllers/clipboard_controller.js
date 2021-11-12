import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ "link" ]

  copy(event) {
    event.preventDefault()
    navigator.permissions.query({ name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        this.writeHTMLToClipboard()
      }
    })
  }

  writeHTMLToClipboard() {
    let linkOuterHTML = this.linkTarget.outerHTML
    let clipText = this.stripControllerText(linkOuterHTML)
    navigator.clipboard.writeText(clipText)
  }

  stripControllerText(linkText) {
    let stripedLink = linkText.replace(/data-.*"callLink" /, "")
    stripedLink = stripedLink.replace(/data-.*"link"/, "")
    stripedLink = stripedLink.replace(/class="result-highlight" /, "")
    return stripedLink
  }
}