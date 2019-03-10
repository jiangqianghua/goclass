/**
 * canvas操作处理
 */
export class WBHandler {
  constructor (property) {
    this.canvas = property.canvas
    this.touch = ('createTouch' in document) // 判定是否为手持设备
    this.StartEvent = this.touch ? 'touchstart' : 'mousedown' // 支持触摸式使用相应的事件替代
    this.MoveEvent = this.touch ? 'touchmove' : 'mousemove'
    this.EndEvent = this.touch ? 'touchend' : 'mouseup'
    this.startDraw = false
    this.down = this.move = this.up = null
    this.bindEvent()
  }

  bindEvent () {
    // 监听鼠标按下事件
    this.canvas['on' + this.StartEvent] = (e) => {
      let touch = this.touch ? e.touches[0] : e
      let box = this.canvas.getBoundingClientRect()
      let _x = (touch.clientX - box.left) * this.canvas.width / box.width
      let _y = (touch.clientY - box.top) * this.canvas.height / box.height
      // console.log('this.canvas.width = ' + this.canvas.width + ' box.width' + box.width)
      // console.log('this.canvas.height = ' + this.canvas.height + ' box.height' + box.height)
      // console.log(this.StartEvent + ' mousex:' + touch.clientX + ' mousey: ' + touch.clientY)
      console.log(this.StartEvent + ' x:' + _x + ' y: ' + _y)
      this.down({'x': _x, 'y': _y})
      this.startDraw = true
    }

    this.canvas['on' + this.MoveEvent] = (e) => {
      if (!this.startDraw) { return }
      let touch = this.touch ? e.touches[0] : e
      let box = this.canvas.getBoundingClientRect()
      let _x = (touch.clientX - box.left) * this.canvas.width / box.width
      let _y = (touch.clientY - box.top) * this.canvas.height / box.height
      console.log(this.MoveEvent + ' x:' + _x + ' y: ' + _y)
      this.move({'x': _x, 'y': _y})
    }

    this.canvas['on' + this.EndEvent] = (e) => {
      if (!this.startDraw) { return }
      let touch = this.touch ? e.touches[0] : e
      let box = this.canvas.getBoundingClientRect()
      let _x = (touch.clientX - box.left) * this.canvas.width / box.width
      let _y = (touch.clientY - box.top) * this.canvas.height / box.height
      console.log(this.EndEvent + ' x:' + _x + ' y: ' + _y)
      this.startDraw = false
      this.up({'x': _x, 'y': _y})
    }
  }
}
