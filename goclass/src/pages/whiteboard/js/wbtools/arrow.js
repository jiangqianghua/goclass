// 绘制箭头

'use strict'
// 绘制直线
import { Shape } from './shape.js'
export class Arrow extends Shape {
  constructor (property) {
    super(property)
    this.x = 0
    this.y = 0
    this.moveX = this.moveY = 0
    this.theta = 30
    this.headlen = 10
    if (property) {
      this.x = property.x || this.x
      this.y = property.y || this.y
      this.moveX = property.moveX || this.moveX
      this.moveY = property.moveY || this.moveY
      this.theta = property.theta || 30
      this.headlen = property.headlen || 10
    }
  }

  updateData (params) {
    this.moveX = params.x
    this.moveY = params.y
  }

  render () {
    console.log('line')
    this.context.save()
    this.context.beginPath()
    let angle = Math.atan2(this.y - this.moveY, this.x - this.moveX) * 180 / Math.PI
    let angle1 = (angle + this.theta) * Math.PI / 180
    let angle2 = (angle - this.theta) * Math.PI / 180
    let topX = this.headlen * Math.cos(angle1)
    let topY = this.headlen * Math.sin(angle1)
    let botX = this.headlen * Math.cos(angle2)
    let botY = this.headlen * Math.sin(angle2)
    let arrowX, arrowY
    this.context.moveTo(this.x, this.y)
    this.context.lineTo(this.moveX, this.moveY)
    arrowX = this.moveX + topX
    arrowY = this.moveY + topY
    this.context.moveTo(arrowX, arrowY)
    this.context.lineTo(this.moveX, this.moveY)
    arrowX = this.moveX + botX
    arrowY = this.moveY + botY
    this.context.lineTo(arrowX, arrowY)

    super.render()
    this.context.stroke()
    this.context.restore()
    super.renderSelected()
  }
}
