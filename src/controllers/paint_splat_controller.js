import { Controller } from "@hotwired/stimulus";
 
export default class extends Controller { 
  static values = { color: String } 
  static classes = [ 'transition' ]
  
  initialize() {
    this.maxDiameter = 1.5 * Math.max(window.innerHeight, window.innerWidth)
  }

  changePage(event) {
    event.preventDefault()
    this.createSplat()
    this.startGrowing()
  }
  
  createSplat() {
    this.splat = document.createElement('div')
    this.splat.style.background = this.colorValue;
    this.splat.classList.add(this.transitionClass)
    this.splat.setAttribute("id", "splat")
    // append spat right after the paint splat controller element. 
    this.element.parentNode.insertBefore(this.splat, this.element.nextSibling)
  }

  splatDiameter() {
    return parseInt(getComputedStyle(document.getElementById("splat")).height)
  }

  startGrowing() {
    this.growTimer = setInterval(() => {
      this.increaseSize()
      if (this.splatDiameter() > this.maxDiameter) {
        this.stopEffectAndSubmitForm(splat)
      }
    }, 10);
  }

  stopEffectAndSubmitForm() {
    window.clearInterval(this.growTimer)
    this.element.submit()
  }

  increaseSize() {
    let newDiameter = this.splatDiameter() + 25
    this.splat.style.height = `${newDiameter}px`
    this.splat.style.width = `${newDiameter}px`
  }
}