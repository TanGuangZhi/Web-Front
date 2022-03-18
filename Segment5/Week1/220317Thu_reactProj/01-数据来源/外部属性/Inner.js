import React, { Component } from 'react'

export default class Inner extends Component {
  change = () => {
    /**
     * 对于基本类型的外部属性：不可修改，否则报错
     * 对于引用类型的外部属性：引用本身不可修改
     *  引用下面的某个子属性可以修改，但是界面不会更新，除非调用this.forceUpdate
     * 
     * 注意：不推荐修改外部属性，否则会导致数据的变化不可以预测
     * 
     * 
     */
    // this.props.msg = "新的msg";
    this.props.obj.msg = "新的msg";
    // this.props.obj = {}
    this.forceUpdate();//强制更新
    console.log(this.props.obj)
  }
  render() {
    console.log('this', this.props.msg)
    return (
      <div>Inner {this.props.obj.msg}  <button onClick={this.change}>修改</button></div>
    )
  }
}
