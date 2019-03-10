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
  }

  render () {
    this.context.lineWidth = this.lineWidth
    this.context.strokeStyle = this.strokeStyle
  }

  setContent (context) {
    this.context = context
  }
}
