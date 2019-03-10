// 绘制圆
import { Shape } from './shape.js'
export class Circle extends Shape {
  constructor (property = null) {
    super(property)
    this.cx = this.cy = 0
    this.x = this.y = 0
    this.r = 0
    this.moveX = this.moveY = 0
    if (property) {
      this.x = property.x || this.x
      this.y = property.y || this.y
      this.r = property.r || this.r
      this.moveX = property.moveX || this.moveX
      this.moveY = property.moveY || this.moveY
    }
    this.cx = this.x
    this.cy = this.y
    this.computerPostion()
  }

  updateData (params) {
    this.moveX = params.x
    this.moveY = params.y
    this.computerPostion()
  }

  computerPostion () {
    let sx = this.x > this.moveX ? this.moveX : this.x
    let sy = this.y > this.moveY ? this.moveY : this.y

    let ex = this.x < this.moveX ? this.moveX : this.x
    let ey = this.y < this.moveY ? this.moveY : this.y

    this.width = Math.abs(sx - ex)
    this.height = Math.abs(sy - ey)
    this.r = this.width > this.height ? this.height / 2 : this.width / 2
    this.cx = (ex + sx) / 2
    this.cy = (ey + sy) / 2
    // this.r = Math.sqrt((this.cx - this.moveX) * (this.cx - this.moveX) + (this.cy - this.moveY) * (this.cy - this.moveY))
  }

  render () {
    console.log('circle')
    this.context.save()
    this.context.beginPath()
    this.context.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI)
    super.render()
    this.context.stroke()
    this.context.restore()
    super.renderSelected()
  }
}
