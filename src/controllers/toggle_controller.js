import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static classes = [ 'after' ]
  
  styleAlternate() {
    this.waitALittle().then(() => {
      if (this.element.classList.contains('after')) {
        this.element.classList.remove(this.afterClass)
      } else {
        this.element.classList.add(this.afterClass)
      }
    })
  }

  waitALittle() {
    return new Promise(resolve => setTimeout(resolve, 400))
  } 
}