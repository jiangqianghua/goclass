'use strict'
// 绘制曲线
import { Shape } from './shape.js'
export class Curve extends Shape {
  constructor (property) {
    super(property)
    this.datas = []
    if (property) {
      this.datas = property.datas || []
    }
  }

  updateData (params) {
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
  }
}
