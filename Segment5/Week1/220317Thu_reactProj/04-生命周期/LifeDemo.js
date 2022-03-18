import React, { Component } from 'react'

export default class LifeDemo extends Component {
    /**
     * 挂载阶段：数据（外部属性、内部状态）的初始化、初始化渲染
     * 
     */

    constructor(props) {//形参props代表的就是初始化的外部属性
        super();
        console.log('01-constructor', props)
        this.state = {
            //初始化的内部状态
            // name:"张三",
            name: props.name,
        }
    }
    change = ()=>{
        this.setState({name:'王五'});
    }


    render() {
        console.log('N-render')
        const { msg } = this.props;
        const { name } = this.state;
        return (
            <div>LifeDemo {msg} {name} <button onClick={this.change}>修改</button></div>
        )
    }
    componentDidMount() {//类似vue中的mounted
        /**
         * 1. 发送接口
         * 2. 获取DOM节点
         * 3. 绑定原生事件 （addEventListener)
         * 4. 设置定时器、延时器
         */
        console.log('03-componentDidMount')
    }
    /**
     * 更新（运行）阶段：界面的更新
     * 
     */
    componentDidUpdate(oldProps,oldState) {//类似vue中的updated
        console.log("04-componentDidUpdate",oldProps,oldState)
     }

     /**
      * 卸载阶段：当组件不用了，就要从内存当中回收，
      * 
      */
     componentWillUnmount(){
         /**
          * 性能优化相关的处理
          * 1. 解绑事件
          * 2. 清楚定时器
          * 
          */
         console.log("05-componentWillUnmount")
     }

}
