import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { index: Number }
  static classes = [ "selected" ]
  static targets = [ "option", "output" ]
  
  select(event) {
    this.indexValue = event.currentTarget.attributes['data-index'].value
  }

  indexValueChanged(value) {
    // highlight correct tab and option
    this.selectUnselect(this.optionTargets)
    this.selectUnselect(this.outputTargets)
  }
  
  selectUnselect(elements) {
    elements.forEach((element, elIndex) => {
      if (elIndex == this.indexValue) {
        element.classList.add(this.selectedClass)
      } else {
        element.classList.remove(this.selectedClass)
      }
    })
  }
}