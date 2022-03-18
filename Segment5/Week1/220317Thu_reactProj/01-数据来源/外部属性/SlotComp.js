import React, { Component } from 'react'

export default class SlotComp extends Component {
  render() {
      console.log('this',this)
    return (
      <div>SlotComp {this.props.children}</div>
    )
  }
}
