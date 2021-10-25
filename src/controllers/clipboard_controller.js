import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "link" ]
  initialize() {

    console.log(navigator.permissions)
  }

  copy() {
    navigator.permissions.query({ name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        this.writeLinkHTMLToClipboard()  
    }})
  }

  writeLinkHTMLToClipboard() {
    let newClip = this.linkTarget.outerHTML.replace(/data-clipboard-target="link"/, "")
    newClip = newClip.replace(/data-number-target="link"/, "")
    navigator.clipboard.writeText(newClip).then(() => {
      console.log("Clipboard successfully set");
      console.log(newClip)
    }, () => {
      console.log("Something went wrong");
    })
  }
}