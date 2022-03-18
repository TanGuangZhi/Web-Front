import React, { Component } from 'react'
import NoControlledComp from './不受控组件/NoControlledComp'
import ControlledComp from './受控组件/ControlledComp'

export default class FormComp extends Component {
  render() {
    return (
      <div>表单组件 <ControlledComp/></div>
    )
  }
}
