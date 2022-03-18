import React, { Component } from 'react'
import LifeDemo from './LifeDemo'
import LifeDemo2  from './LifeDemo2'

export default class LifeDemoWrapper extends Component {
  state = {
    isShow:true,
  }
  toggle = ()=>{
    this.setState({
      isShow:!this.state.isShow
    });
  }
  render() {
    const {isShow} = this.state;
    return (
      <div>
        {
          isShow && <LifeDemo2/>
        }
        <button onClick={this.toggle}>切换LifeDemo组件</button>
      </div>
    )
  }
}
