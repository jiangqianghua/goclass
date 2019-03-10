'use strict'
// 绘制矩形
import { Shape } from './shape.js'
export class SelectBorder extends Shape {
  constructor (property) {
    super(property)
    this.x = 0
    this.y = 0
    this.moveX = 0
    this.moveY = 0
    this.width = this.height = 0
    if (property) {
      this.x = property.x || this.x
      this.y = property.y || this.y
      this.moveX = property.moveX || this.moveX
      this.moveY = property.moveY || this.moveY
    }
    this.nx = this.x
    this.ny = this.y
    this.computerPostion()
  }

  updateData (params) {
    this.moveX = params.x
    this.moveY = params.y
    this.computerPostion()
  }

  computerPostion () {
    this.nx = this.x > this.moveX ? this.moveX : this.x
    this.ny = this.y > this.moveY ? this.moveY : this.y
    this.width = Math.abs(this.x - this.moveX)
    this.height = Math.abs(this.y - this.moveY)
  }

  render () {
    this.context.save()
    this.context.beginPath()
    this.context.lineWidth = 1
    this.context.strokeStyle = 'gray'
    this.context.setLineDash([25, 5])
    this.context.rect(this.nx, this.ny, this.width, this.height)
    this.context.stroke()
    this.context.restore()
  }
}
