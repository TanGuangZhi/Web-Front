import React, { Component } from 'react'

export default class StateComp extends Component {
    //内部状态的定义
    state = {
        //对象中的键值对就是内部状态
        name: "张三",
        sex:"男"
    }
    // data(){
    //     return {
    //         //
    //     }
    // }

    /**
     * setState
     *  1. 在React事件体系（包括生命周期钩子函数）中直接调用时，它是异步的，
     * 其他情况它是同步的（比如在延时器、定时器中、原生事件处理函数中调用时）
     * 
     * 2. setState调用的时候，render方法一定会执行吗？
     *  为了性能方面的优化，不一定每次调用setState，render方法都会执行，
     * 但是至少会执行一次
     * 
     * 
     * 
     */

    //内部状态的修改
    change = () => {
        // this.state.name = "李四";
        // this.setState({
        //     //key(你要修改的状态名):value（新的值）
        //     name:'李四'
        // },()=>{
        //     //该回调函数的执行时机：数据修改完毕，并且界面重新渲染完毕后执行
        //     console.log('setState回调中：',this.state)
        // })
        // console.log("this.state",this.state);

        // setTimeout(()=>{
        //     this.setState({name:"李四"});//同步的
        //     console.log("this.state",this.state);

        // },1000);
        //多次调用setState
        this.setState({name:"李四"});
        this.setState({name:"赵六"});
        this.setState({name:"王五"});
        // this.setState({name:"王二麻子"});
        this.setState((state)=>({
            name:'王二麻子'
        }));
        console.log('this.state',this.state);
        // Object.assign(this.state,{name:"李四"})
      
    }
    render() {
        //内部状态的使用
        const { name,sex } = this.state;
        console.log("render方法执行了")
        return (
            <div>我叫：{name} 性别：{sex}   <button onClick={this.change}>修改</button></div>
        )
    }
}

// let o = {name:'zhangsan'};
// let o2 = {sex:'李四'};
// const newO = Object.assign(o,o2);
// console.log('newO',newO)
// console.log('o',o)

// o = {
//     ...o,
//     ...o2,
// }
