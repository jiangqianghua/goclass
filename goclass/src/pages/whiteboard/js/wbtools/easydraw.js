/**
 * ES6
 */

// 启动严格模式
'use strict'

import {WBHandler} from './wbhandler.js'
import {Line} from './line'
import {Arrow} from './arrow'
import {Circle} from './circle'
import {Curve} from './curve'
import {Rectangle} from './rectangle'
import {SelectBorder} from './selectborder'

export class EasyDraw {
  constructor (stage) {
    this.canvas = document.getElementById(stage)
    this.context = this.canvas.getContext('2d')
    this.children = []
    this.wbHandler = new WBHandler({'canvas': this.canvas})
    this.drawType = 4
    this.curShape = null
    this.selectBorder = null
    this.downX = this.downY = 0
    this.bindWBHandlerEvent()
    console.log('EasyDraw...')
  }

  bindWBHandlerEvent () {
    this.wbHandler.down = (e) => {
      console.log('down x:' + e.x + ' y: ' + e.y)
      this.curDrawId++
      if (this.drawType === 5) {
        if (this.isDownInSelectShape(e.x, e.y)) {
          // 移动操作
          this.downX = e.x
          this.downY = e.y
          this.drawType = 6
        } else {
          let shape = this.createShape(e.x, e.y)
          this.selectBorder = shape
          this.selectBorder.setContent(this.context)
          this.curShape = null
        }
      } else if (this.drawType === 6) {
        // 移动操作
        this.downX = e.x
        this.downY = e.y
      } else {
        let shape = this.createShape(e.x, e.y)
        this.addChild(shape)
        this.curShape = shape
      }
    }

    this.wbHandler.move = (e) => {
      console.log('move x:' + e.x + ' y: ' + e.y)
      if (this.curShape) {
        this.curShape.updateData(e)
      } else if (this.selectBorder) {
        this.selectBorder.updateData(e)
      } else if (this.drawType === 6) {
        let delteX = e.x - this.downX
        let delteY = e.y - this.downY
        this.downY = e.y
        this.downX = e.x
        this.moveSelectShape(delteX, delteY)
      }
      this.update()
    }

    this.wbHandler.up = (e) => {
      console.log('up x:' + e.x + ' y: ' + e.y)
      if (this.curShape) {
        this.curShape.updateData(e)
      } else if (this.selectBorder) {
        this.selectBorder.updateData(e)
        this.showSelectBoderShape()
      } else if (this.drawType === 6) {
        this.drawType = 5
      }
      this.selectBorder = null
      this.curShape = null
      this.update()
    }
  }
  // 判断点是否在选中的图形里面
  isDownInSelectShape (x, y) {
    for (let i = 0; i < this.children.length; i++) {
      let item = this.children[i]
      if (item.checkIn(x, y)) {
        return true
      }
    }
    return false
  }

  // 移动选中的点
  moveSelectShape (delteX, delteY) {
    this.children.map((item, index) => {
      item.moveShape(delteX, delteY)
    })
  }

  // 显示选中的图形
  showSelectBoderShape () {
    this.children.map((item, index) => {
      item.checkSelect(this.selectBorder.x, this.selectBorder.y, this.selectBorder.moveX, this.selectBorder.moveY)
    })
  }

  // 添加元素
  addChild (shape) {
    shape.setContent(this.context)
    this.children.push(shape)
    this.update()
  }

  // 删除元素
  delChild (id) {
    let index = this.find(id)
    console.log('del index=' + index)
    if (index >= 0) { this.children.splice(index, 1) }
  }

  // 查找元素，返回index
  find (id) {
    for (let i = 0; i < this.children.length; i++) {
      let item = this.children[i]
      if (item && item.id === id) { return i }
    }
    return -1
  }

  // 重置画板
  clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // 更新界面
  update () {
    this.clear()
    this.children.map((item, index) => {
      item.render()
    })
    if (this.selectBorder) {
      this.selectBorder.render()
      console.log('selectBorder.render()')
    }
    // this.context.draw()
  }

  setShapeType (type) {
    if (type === 7) {
      this.removeSelectShape()
    } else {
      this.drawType = type
    }
  }

  // 删除被选中的图形
  removeSelectShape () {
    let newData = []
    this.children.map((item, index) => {
      if (!item.selected) {
        newData.push(item)
      }
    })
    this.children = newData
    this.update()
  }

  // 创建图形
  createShape (x, y) {
    if (this.drawType === 0) {
      let line = new Line({
        id: '1',
        x: x,
        y: y,
        moveX: x,
        moveY: y,
        lineWidth: 3,
        strokeStyle: 'red'
      })
      return line
    } else if (this.drawType === 1) {
      let arrow = new Arrow({
        id: '5',
        x: x,
        y: y,
        moveX: x,
        moveY: y,
        lineWidth: 3,
        strokeStyle: 'black',
        theta: 30, // 箭头夹角
        headlen: 10 // 箭头长度
      })
      return arrow
    } else if (this.drawType === 2) {
      let circle = new Circle({
        id: '1',
        x: x,
        y: y,
        moveX: x,
        moveY: y,
        lineWidth: 3,
        strokeStyle: 'red'
      })
      return circle
    } else if (this.drawType === 3) {
      let curve = new Curve({
        id: '1',
        datas: [{'x': x, 'y': y}],
        lineWidth: 3,
        strokeStyle: 'red'
      })
      return curve
    } else if (this.drawType === 4) {
      let rectangle = new Rectangle({
        id: '1',
        x: x,
        y: y,
        moveX: x,
        moveY: y,
        lineWidth: 3,
        strokeStyle: 'red'
      })
      return rectangle
    } else if (this.drawType === 5) {
      let selectBorder = new SelectBorder({
        id: '1',
        x: x,
        y: y,
        moveX: x,
        moveY: y,
        lineWidth: 3,
        strokeStyle: 'red'
      })
      return selectBorder
    }
  }
}
