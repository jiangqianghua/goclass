
'use strict'
// 绘制直线
import {Shape} from './shape.js'
export class Line extends Shape {
  constructor (property) {
    super(property)
    this.x = 0
    this.y = 0
    this.moveX = this.moveY = 0
    if (property) {
      this.x = property.x || this.x
      this.y = property.y || this.y
      this.moveX = property.moveX || this.moveX
      this.moveY = property.moveY || this.moveY
    }
    this.computerPostion()
  }

  updateData (params) {
    this.moveX = params.x
    this.moveY = params.y
    this.computerPostion()
  }

  computerPostion () {
    // this.x = this.x > this.moveX ? this.moveX : this.x
    // this.y = this.y > this.moveY ? this.moveY : this.y
    //
    // this.moveX = this.x < this.moveX ? this.moveX : this.x
    // this.moveY = this.y < this.moveY ? this.moveY : this.y
  }

  render () {
    console.log('line')
    this.context.save()
    this.context.beginPath()
    super.render()
    this.context.moveTo(this.x, this.y)
    this.context.lineTo(this.moveX, this.moveY)

    this.context.stroke()
    this.context.restore()

    super.renderSelected()
  }
}
