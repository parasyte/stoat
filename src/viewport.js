"use strict"

const Bounds    = import("bounds")
const Matrix3d  = import("matrix3d")

export default class Viewport extends Bounds {
  constructor(width, height, depth) {
    // TODO: needs inner and outer bounds
    super(0, width, 0, height, 0, depth)
    this.matrix = new Matrix3d()
  }
}
