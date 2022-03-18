import React, { Component } from 'react'
/**
 * 作用域：标识符（变量和函数）能够访问的范围
 * 作用域链
 * 
 */
// function outer(){
//     const timer = '111';
 
// }
// function inner(){
//     // const timer = 'inner'
//      console.log(timer)
//  }
//  inner()

export default class LifeDemo2 extends Component {
    state = {
        count:1
    }
    componentDidMount(){
      this.timer = setInterval(()=>{
            console.log('定时器执行过程中')
            this.setState({
                count:this.state.count + 1
            });
        },1000);
        /**
         * 参数一：事件类型
         * 参数二：事件处理函数
         * 
         */
        document.addEventListener('click',this.clickDom)
    }
    componentWillUnmount(){
        // console.log(timer)
        clearInterval(this.timer)
        //解绑事件
        document.removeEventListener('click',this.clickDom);
    }
    clickDom = ()=>{
        console.log('click-dom')
    }


  render() {
      const {count} = this.state;
    return (
      <div>LifeDemo2 {count}</div>
    )
  }
}
