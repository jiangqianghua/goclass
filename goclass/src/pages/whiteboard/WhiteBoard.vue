<template>
  <div>
    <button @click="test">Click</button>
    <canvas id="stage" class="stage" width="600" height="400"></canvas>
  </div>
</template>

<script>
import {Arrow} from './js/wbtools/test.js'
import {Line} from './js/wbtools/line'
import {EasyDraw} from './js/wbtools/easydraw'

export default {
  name: 'WhiteBoard',
  data () {
    return {
      easyDraw: null
    }
  },
  mounted: function () {
    this.initData()
  },

  methods: {
    initData: function () {
      if (!this.easyDraw) {
        this.easyDraw = new EasyDraw('stage')
      }
    },
    test: function () {
      let arrow = new Arrow()
      arrow.printlog()
      let line = new Line({
        id: '1',
        x: Math.ceil(Math.random() * 600),
        y: Math.ceil(Math.random() * 400),
        moveX: Math.ceil(Math.random() * 600),
        moveY: Math.ceil(Math.random() * 400),
        lineWidth: Math.ceil(Math.random() * 10),
        strokeStyle: 'red'
      })

      this.easyDraw.addChild(line)
      this.easyDraw.update()
    }
  }
}
</script>

<style scoped>

</style>
