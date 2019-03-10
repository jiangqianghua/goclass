<template>
  <div class="wb-container">
    <div class="tools">
      <button @click="btnClick(0)">直线</button>
      <button @click="btnClick(4)">矩形</button>
      <button @click="btnClick(2)">圆形</button>
      <button @click="btnClick(3)">线条</button>
      <button @click="btnClick(1)">箭头</button>
    </div>
    <div class="canvas-container">
      <canvas id="stage" class="stage" width="600" height="400"></canvas>
    </div>
  </div>
</template>

<script>
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
    btnClick: function (type) {
      this.easyDraw.setShapeType(type)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wb-container
    display flex
    flex-display row

</style>
