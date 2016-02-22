"use strict"

const Bounds    = import("bounds")
const Matrix3d  = import("matrix3d")

export default class Group {
  constructor(x, y, z, options) {
    options = options || {}

    const width   = options.width   || 0
    const height  = options.height  || 0
    const depth   = options.depth   || 0

    this._children = []
    this._matrix   = new Matrix3d().translate(x, y, z)
    this._bounds   = new Bounds(
      options.left    || x,
      options.right   || x + width,
      options.top     || y,
      options.bottom  || y + height,
      options.front   || z,
      options.back    || z + depth
    )
  }

  add(child) {
    if (child.parent) {
      throw new Error("Child must be orphaned:", child)
    }

    child.parent = this
    this._children.push(child) // TODO: Sorting
  }

  remove(child) {
    if (child.parent !== this) {
      throw new Error("Child must be mine:", child)
    }

    child.parent = undefined
    this._children.splice(this._children.indexOf(child), 1) // TODO: Perf
  }

  update(dt, bounds) {
    let updated = false

    if (bounds.intersects(this._bounds)) {
      for (let child of this._children.slice()) {
        // FIXME: Update child bounds
        // Needs:
        // * AABB (Bounds)
        // * MBB (Rect) (rotated and scaled)
        // Help?

        updated |= child.update(dt, this._bounds)
      }
    }

    return updated
  }

  draw() {
    for (let child of this._children.slice()) {
      child.draw()
    }
  }
}
