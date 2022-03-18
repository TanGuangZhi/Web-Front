import React, { Component } from 'react'

export default class ConditionRender extends Component {
    state = {
        isShow:true,
        displayOrNone:'none'
    }
    toggle = ()=>{
        this.setState({
            isShow:!this.state.isShow,
            displayOrNone:this.state.displayOrNone === 'none' ? 'block' : 'none'
        })
    }
  render() {
      const {isShow,displayOrNone} = this.state;
    return (
      <div>
          <button onClick={this.toggle}>点我切换</button>
          {/* {
              isShow && <div style={ {width:50,height:50,backgroundColor:'red'} }></div>
          } */}
          <div style={ {width:50,height:50,backgroundColor:'red',display:displayOrNone} }></div>
         
      </div>
    )
  }
}
