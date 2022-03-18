import React, { Component } from 'react'

export default class ControlledComp extends Component {
    state = {
        val:""
    }
    inputChange = (e)=>{
        // console.log('e',e)
        const val = e.target.value;//实时获取用户的输入值
        console.log('val',val)
        //把用户的输入值同步到状态中
        this.setState({val:val.toUpperCase()});
      
    }
  render() {
      const {val} = this.state;
    return (
      <div>受控组件：<input value={val} onChange={this.inputChange}/></div>
    )
  }
}
