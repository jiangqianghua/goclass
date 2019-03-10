/**
 * ES6
 */
// 启动严格模式
'use strict'
export class EasyDraw {

  constructor (stage) {
    this.canvas = document.getElementById(stage);
    this.context = this.canvas.getContext('2d');
    this.children = new Array()
    console.log("EasyDraw...")
  }

  // 添加元素
  addChild(shape){
    shape.setContent(this.context);
    this.children.push(shape);
  }

  // 删除元素
  delChild(id){
    let index = this.find(id);
    console.log("del index="+index);
    if(index >= 0)
      this.children.splice(index, 1);
  }

  // 查找元素，返回index
  find(id){
    for(let i = 0 ; i < this.children.length;i++){
      let item = this.children[i];
      if(item && item.id == id)
        return i;
    }
    return -1 ;
  }

  // 重置画板
  clear() {
    this.context.clearRect(0, 0, 300, 200);
  }

  // 更新界面
  update(){
    this.clear();
    this.children.map((item,index)=>{
      item.render();
    });
    this.context.draw()
  }
}

 //module.exports = EasyDraw;

 // export defalut{
 //  EasyDraw
 // }

