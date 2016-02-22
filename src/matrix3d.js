"use strict"

export default class Matrix3d {
  constructor() {
    this.data = new Float32Array(16)

    if (arguments.length === 16) {
      this.set.apply(this, arguments)
    }
    else {
      this.identity()
    }
  }

  identity() {
    this.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    )

    return this
  }

  set() {
    const a = this.data

    a[0]  = arguments[0]
    a[1]  = arguments[1]
    a[2]  = arguments[2]
    a[3]  = arguments[3]
    a[4]  = arguments[4]
    a[5]  = arguments[5]
    a[6]  = arguments[6]
    a[7]  = arguments[7]
    a[8]  = arguments[8]
    a[9]  = arguments[9]
    a[10] = arguments[10]
    a[11] = arguments[11]
    a[12] = arguments[12]
    a[13] = arguments[13]
    a[14] = arguments[14]
    a[15] = arguments[15]

    return this
  }

  copy(other) {
    this.data.set(other.data)
    return this
  }

  multiply(other) {
    const a   = this.data
    const b   = other.data
    const a0  = a[0]
    const a1  = a[1]
    const a2  = a[2]
    const a4  = a[4]
    const a5  = a[5]
    const a6  = a[6]
    const a8  = a[8]
    const a9  = a[9]
    const a10 = a[10]
    const b0  = b[0]
    const b1  = b[1]
    const b2  = b[2]
    const b4  = b[4]
    const b5  = b[5]
    const b6  = b[6]
    const b8  = b[8]
    const b9  = b[9]
    const b10 = b[10]
    const b12 = b[12]
    const b13 = b[13]
    const b14 = b[14]

    a[0]   = a0 * b0  + a4 * b1  + a8  * b2
    a[1]   = a1 * b0  + a5 * b1  + a9  * b2
    a[2]   = a2 * b0  + a6 * b1  + a10 * b2
    a[4]   = a0 * b4  + a4 * b5  + a8  * b6
    a[5]   = a1 * b4  + a5 * b5  + a9  * b6
    a[6]   = a2 * b4  + a6 * b5  + a10 * b6
    a[8]   = a0 * b8  + a4 * b9  + a8  * b10
    a[9]   = a1 * b8  + a5 * b9  + a9  * b10
    a[10]  = a2 * b8  + a6 * b9  + a10 * b10
    a[12] += a0 * b12 + a4 * b13 + a8  * b14
    a[13] += a1 * b12 + a5 * b13 + a9  * b14
    a[14] += a2 * b12 + a6 * b13 + a10 * b14

    return this
  }

  scale(x, y, z) {
    const a = this.data

    a[0]  *= x
    a[1]  *= x
    a[2]  *= x
    a[4]  *= y
    a[5]  *= y
    a[6]  *= y
    a[8]  *= z
    a[9]  *= z
    a[10] *= z

    return this
  }

  rotateX(angle) {
    if (angle !== 0) {
      const a   = this.data
      const a5  = a[5]
      const a6  = a[6]
      const a9  = a[9]
      const a10 = a[10]
      const s   = Math.sin(angle)
      const c   = Math.cos(angle)

      a[5]  = a5 *  c + a9  * s
      a[6]  = a6 *  c + a10 * s
      a[9]  = a5 * -s + a9  * c
      a[10] = a6 * -s + a10 * c
    }

    return this
  }

  rotateY(angle) {
    if (angle !== 0) {
      const a   = this.data
      const a0  = a[0]
      const a2  = a[2]
      const a8  = a[8]
      const a10 = a[10]
      const s   = Math.sin(angle)
      const c   = Math.cos(angle)

      a[0]  = a0 *  c + a8  * s
      a[2]  = a2 *  c + a10 * s
      a[8]  = a0 * -s + a8  * c
      a[10] = a2 * -s + a10 * c
    }

    return this
  }

  rotateZ(angle) {
    if (angle !== 0) {
      const a  = this.data
      const a0 = a[0]
      const a1 = a[1]
      const a4 = a[4]
      const a5 = a[5]
      const s  = Math.sin(angle)
      const c  = Math.cos(angle)

      a[0] = a0 *  c + a4 * s
      a[1] = a1 *  c + a5 * s
      a[4] = a0 * -s + a4 * c
      a[5] = a1 * -s + a5 * c
    }

    return this
  }

  translate(x, y, z) {
    const a = this.data

    a[12] += x * a[0] + y * a[4] + z * a[8]
    a[13] += x * a[1] + y * a[5] + z * a[9]
    a[14] += x * a[2] + y * a[6] + z * a[10]

    return this
  }

  isIdentity() {
    const a = this.data

    return (
      a[0]  === 1 &&
      a[1]  === 0 &&
      a[2]  === 0 &&
      a[3]  === 0 &&
      a[4]  === 0 &&
      a[5]  === 1 &&
      a[6]  === 0 &&
      a[7]  === 0 &&
      a[8]  === 0 &&
      a[9]  === 0 &&
      a[10] === 1 &&
      a[11] === 0 &&
      a[12] === 0 &&
      a[13] === 0 &&
      a[14] === 0 &&
      a[15] === 1
    )
  }
}
