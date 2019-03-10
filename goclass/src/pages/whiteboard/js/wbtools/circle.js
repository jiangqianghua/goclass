// 绘制圆
import { Shape } from './shape.js'
export class Circle extends Shape {
  constructor (property = null) {
    super(property)
    this.cx = this.cy = 0
    this.r = 0
    this.endX = this.endY = 0
    if (property) {
      this.cx = property.cx || this.cx
      this.cy = property.cy || this.cy
      this.r = property.r || this.r
      this.endX = property.endX || this.endX
      this.endY = property.endY || this.endY
    }
    this.computerPostion()
  }

  updateData (params) {
    this.endX = params.x
    this.endY = params.y
    this.computerPostion()
  }

  computerPostion () {
    this.r = Math.sqrt((this.cx - this.endX) * (this.cx - this.endX) + (this.cy - this.endY) * (this.cy - this.endY))
  }

  render () {
    console.log('circle')
    this.context.save()
    this.context.beginPath()
    this.context.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI)
    super.render()
    this.context.stroke()
    this.context.restore()
  }
}
