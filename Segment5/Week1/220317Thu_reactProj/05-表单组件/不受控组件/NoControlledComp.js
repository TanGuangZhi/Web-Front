import React, { Component } from 'react'

export default class NoControlledComp extends Component {
    getInputVal = () => {
        //获取input的输入值
        // const ele = document.getElementById('inp');

        // const val = ele.value;
        const val = this.inp.value
        console.log('val', val)
    }
    getInputNode = (node) => {
        console.log('getInputNode', node)
        this.inp = node;
    }
    render() {
        return (
            <div>不受控组件：<input id="inp"
                // ref={this.getInputNode}
                ref={(node)=>this.inp = node}

            />
                <button onClick={this.getInputVal}>获取</button>
            </div>
        )
    }
}
