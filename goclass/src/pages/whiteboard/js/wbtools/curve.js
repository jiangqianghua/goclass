'use strict'
// 绘制曲线
import { Shape } from './shape.js'
export class Curve extends Shape {
  constructor (property) {
    super(property)
    this.datas = []
    this.x = this.y = 0
    this.moveX = this.moveY = 0
    if (property) {
      this.datas = property.datas || []
      this.x = property.x || this.datas[0].x
      this.y = property.y || this.datas[0].y
      this.moveX = property.moveX || this.datas[0].x
      this.moveY = property.moveY || this.datas[0].y
    }
  }

  updateData (params) {
    this.x = this.x > params.x ? params.x : this.x
    this.y = this.y > params.y ? params.y : this.y

    this.moveX = this.moveX < params.x ? params.x : this.moveX
    this.moveY = this.moveY < params.y ? params.y : this.moveY
    // console.log('updateData ' + this.x + ':' + this.y + ' --- ' + this.moveX + ':' + this.moveY)
    this.datas.push(params)
  }

  render () {
    this.context.save()
    this.context.beginPath()
    for (let i = 0; i < this.datas.length; i++) {
      let data = this.datas[i]
      if (i === 0) {
        this.context.moveTo(data.x, data.y)
      } else {
        this.context.lineTo(data.x, data.y)
      }
    }
    super.render()
    this.context.stroke()
    this.context.restore()
    super.renderSelected()
  }

  moveShape (delteX, delteY) {
    super.moveShape(delteX, delteY)
    if (this.selected) {
      this.datas.map((item, index) => {
        item.x = item.x + delteX
        item.y = item.y + delteY
      })
    }
  }
}
