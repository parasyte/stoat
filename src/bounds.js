"use strict"

export default class Bounds {
  constructor(left, right, top, bottom, front, back) {
    this.left   = left    || 0
    this.right  = right   || 0
    this.top    = top     || 0
    this.bottom = bottom  || 0
    this.front  = front   || 0
    this.back   = back    || 0
  }

  intersects(other) {
    return (
      this.left   < other.right   &&
      this.top    < other.bottom  &&
      this.front  < other.back    &&
      other.left  < this.right    &&
      other.top   < this.bottom   &&
      other.front < this.back
    )
  }
}
