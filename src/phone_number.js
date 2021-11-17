export class PhoneNumber {
  constructor(number, country="1", escape="+", ext="", pause=0) {
    this.number = number;
    this.country = country;
    this.escape = escape;
    this.ext = ext;
    this.pause = pause
  }

  to_s() {
    let output = `${this.escape}${this.country} ${this.number}`
    return this.ext != "" ? output + ` Ext ${this.ext}` : output
  }

  to_link() {
    let linkHREF = `tel:${this.escape}${this.country}${this.number.replace(/[^+\d]/g, "")}`
    if (+this.pause > 0 && this.ext != "") {
      linkHREF += (',' * +this.pause) + this.ext;
    }
    else if (this.ext != "") {
      linkHREF += '#' + this.ext; 
    }
    return linkHREF
  }
}
