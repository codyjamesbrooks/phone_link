import { Controller } from "@hotwired/stimulus";
 
export default class extends Controller { 
  static values = { color: String } 
  static classes = [ 'transition' ]

  initialize() {

  }

  trigger() {
    this.createSplat()
    // const splat = this.createSplat()
    // this.appendSplat(splat)
    // this.startGrowing(splat)
    console.log(this.colorValue)
  }
  
  createSplat() {
    const splat = document.createElement('div')
    splat.style.background = this.colorValue;
    splat.classList.add(this.transitionClass)
    splat.setAttribute('id', 'splat')
    this.element.appendChild(splat)
  }

  startGrowing(splat) {
    let timesRun = 0;
    this.growTimer = setInterval(() => {
      this.increaseSize(splat)
      if (++timesRun === 75) {
        this.stopAndDestroySplat(splat)
      }
    }, 10);
  }

  stopAndDestroySplat() {
    window.clearInterval(this.growTimer)
    document.getElementById('splat').remove()
  }

  increaseSize(splat) {
    console.log("firing")
    let newDiameter = parseInt(getComputedStyle(splat).height) + 25
    splat.style.height = `${newDiameter}px`
    splat.style.width = `${newDiameter}px`
  }
}