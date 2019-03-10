'use strict'
// 绘制矩形
import { Shape } from './shape.js'
export class Rectangle extends Shape {
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
    console.log('rectange')
    this.context.save()
    this.context.beginPath()
    Shape.prototype.render.apply(this, arguments)
    this.context.rect(this.nx, this.ny, this.width, this.height)
    this.context.stroke()
    this.context.restore()
  }
}

