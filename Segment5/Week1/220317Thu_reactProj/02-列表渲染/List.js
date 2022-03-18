import React, { Component } from 'react'
/**
 * JSX的一个特性：能够自动的遍历JSX数组，生成一个列表
 *  JSX数组：每个元素都是JSX对象的数组我们称之为JSX数组
 *  例如：[<div>姓名：张三  性别：男 age : 20</div>,<div>姓名：张三1  性别：女 age : 21</div>]
 *  [{a:1},{a:2}]
 * 
 * 
 */
export default class List extends Component {
    state = {
        list:[
            {name:"张三",sex:'男',age:20},
            {name:"赵六",sex:'男',age:22},
            {name:"李四",sex:'男',age:24},
        ]
    }
  render() {
      const {list} = this.state;
    return (
      <div>
          {/* { [<div>姓名：张三  性别：男 age : 20</div>,<div>姓名：张三1  性别：女 age : 21</div>] } */}
          {/* <div>姓名：张三  性别：男 age : 20</div>
          <div>姓名：张三1  性别：女 age : 21</div>
          <div>姓名：张三2  性别：男 age : 22</div> */}

          {
              list.map((item,index)=>{
                  return <div key={index}>姓名：{item.name}  性别：{item.sex} age : {item.age}</div>
              })
          }
      </div>
    )
  }
}

// const o = {a:1,b:2};
// const {a,b} = o;
// // console.log(a,b)
// const arr = [1,2,3];
// const [a,b,c] = arr;
// console.log(a,b,c)


