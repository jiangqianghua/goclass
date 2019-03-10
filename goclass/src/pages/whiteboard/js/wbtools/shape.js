'use strict'
// 图形基类
export class Shape {
  constructor (property) {
    this.id = undefined
    this.strokeStyle = 'blue'
    this.lineWidth = 10
    if (property) {
      this.lineWidth = property.lineWidth || this.lineWidth
      this.strokeStyle = property.strokeStyle || this.strokeStyle
      this.id = property.id || undefined
    }
    // 是否被选中
    this.selected = false
  }

  render () {
    this.context.lineWidth = this.lineWidth
    this.context.strokeStyle = this.strokeStyle
  }
  // 检查是否被选中
  checkSelect (x01, y01, x02, y02) {
    let x11 = this.x
    let y11 = this.y
    let x12 = this.moveX
    let y12 = this.moveY

    let zx = Math.abs(x01 + x02 - x11 - x12)
    let x = Math.abs(x01 - x02) + Math.abs(x11 - x12)
    let zy = Math.abs(y01 + y02 - y11 - y12)
    let y = Math.abs(y01 - y02) + Math.abs(y11 - y12)
    if (zx <= x && zy <= y) { this.selected = true } else { this.selected = false }
  }

  // 判断点是否在选中的矩形中
  checkIn (x1, y1) {
    // console.log('checkIn in ' + this.x + ':' + this.y + '  ' + this.moveX + ':' + this.moveY)
    // console.log('checkIn out ' + x1 + ':' + y1)
    if (!this.selected) { return false }
    if (((this.x - x1) * (this.moveX - x1)) < 0 && ((this.y - y1) * (this.moveY - y1)) < 0) { return true }
    return false
  }

  moveShape (delteX, delteY) {
    if (this.selected) {
      this.x = this.x + delteX
      this.y = this.y + delteY
      this.moveX = this.moveX + delteX
      this.moveY = this.moveY + delteY
    }
  }

  reSetSelect () {
    this.selected = false
  }

  renderSelected () {
    if (this.selected) {
      let x = this.x
      let y = this.y
      let moveX = this.moveX
      let moveY = this.moveY

      let nx = x > moveX ? moveX : x
      let ny = y > moveY ? moveY : y

      nx = nx - 5
      ny = ny - 5

      let w = Math.abs(x - moveX) + 10
      let h = Math.abs(y - moveY) + 10

      this.context.save()
      this.context.beginPath()
      this.context.lineWidth = 1
      this.context.strokeStyle = 'gray'
      this.context.setLineDash([25, 5])
      this.context.rect(nx, ny, w, h)
      this.context.stroke()
      this.context.restore()
    }
  }

  setContent (context) {
    this.context = context
  }

  setSelected (selected) {
    this.selected = selected
  }
}
