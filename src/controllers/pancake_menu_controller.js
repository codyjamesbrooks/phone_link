import { Controller, ElementObserver } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number };
  static classes = [ 'colapsed' ];
  static targets = [ "option" ];
  
  select(event) {
    this.indexValue = event.target.attributes["data-index"].value
  }

  indexValueChanged(value) {
    // loop over all the pancake menu options, if the index matches 
    this.optionTargets.forEach((element, eleIndex) => {
      if(eleIndex == this.indexValue) {
        element.classList.remove(this.colapsedClass);
      } else {
        element.classList.add(this.colapsedClass);
      }
    })
  }
}
