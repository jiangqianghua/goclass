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
