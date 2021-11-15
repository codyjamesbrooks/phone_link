import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ 'hiddenElement' ] 
  
  toggleShow(event) {
    event.preventDefault()
    if(this.hiddenElementTarget.classList.contains('hidden')) {
      this.hiddenElementTarget.classList.remove('hidden')
    } else {
      this.hiddenElementTarget.classList.add('hidden')
    }
  }
}