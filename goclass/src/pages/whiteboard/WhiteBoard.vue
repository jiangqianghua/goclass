<template>
  <div class="wb-container">

    <div class="canvas-container">
      <canvas id="stage" class="stage" width="1200" height="800"></canvas>
      <input v-show="textShow" v-model="textVal" id="text" type="text" class="text" :style="'left:' + textX + 'px; top:' + textY +'px'"/>
    </div>

    <div class="tools">
      <button @click="btnClick(0)">直线</button><br>
      <button @click="btnClick(4)">矩形</button><br>
      <button @click="btnClick(2)">圆形</button><br>
      <button @click="btnClick(3)">线条</button><br>
      <button @click="btnClick(1)">箭头</button><br>
      <button @click="btnClick(5)">选中</button><br>
      <button @click="btnClick(6)">操作</button><br>
      <button @click="btnClick(8)">文本</button><br>
      <button @click="btnClick(7)">删除</button><br>
    </div>
  </div>
</template>

<script>
import {EasyDraw} from './js/wbtools/easydraw'

export default {
  name: 'WhiteBoard',
  data () {
    return {
      easyDraw: null,
      textShow: false,
      textX: 0,
      textY: 0,
      textVal: ''
    }
  },
  mounted: function () {
    this.initData()
  },

  methods: {
    isEmpty: function (obj) {
      if (typeof obj === 'undefined' || obj == null || obj === '') {
        return true
      } else {
        return false
      }
    },
    easyDrawCallback: function (type, params) {
      if (type === 1) {
        if (this.textShow) {
          if (!this.isEmpty(this.textVal)) {
            let text = this.textVal
            this.textVal = ''
            this.textShow = false
            return {isDraw: true, text: text, x: this.textX, y: this.textY}
          }
        } else {
          this.textX = params.x
          this.textY = params.y
          this.textShow = true
          return {isDraw: false, text: ''}
        }
      }
    },
    initData: function () {
      if (!this.easyDraw) {
        this.easyDraw = new EasyDraw('stage', this.easyDrawCallback)
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
  .canvas-container
    position absolute
   .tools
    position absolute
    width 60px
    left: 0px
    top: 0px
  .text
    position absolute
    background-color transparent

</style>
