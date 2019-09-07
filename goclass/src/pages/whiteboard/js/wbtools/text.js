'use strict'
// 绘制文本
import { Shape } from './shape.js'

export class Text extends Shape {
  constructor (property) {
    super(property)
    this.x = 0
    this.y = 0
    this.text = ''
    if (property) {
      this.x = property.x || this.x
      this.y = property.y || this.y
      this.text = property.text || this.text
    }
  }

  updateData (params) {

  }

  render () {
    console.log('rectange')
    this.context.save()
    this.context.beginPath()
    // Shape.prototype.render.apply(this, arguments)
    super.render()
    this.context.font = '14px Arial'
    this.width = this.context.measureText(this.text).width
    this.height = 14
    this.moveX = this.x + this.width
    this.moveY = this.y + this.height
    this.context.fillText(this.text, this.x, this.y + this.height)
    console.log('w=' + this.width + ' h=' + this.height)
    this.context.restore()
    this.renderSelected()
  }
}
