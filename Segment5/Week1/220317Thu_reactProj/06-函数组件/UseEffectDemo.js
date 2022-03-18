import React, { useEffect, useState } from 'react';

export default function UseEffectDemo() {
    const [name, setName] = useState('张三')
    const [sex, setSex] = useState('男');
    const [count, setCount] = useState(0)
    /**
     * useEffect第一个参数（函数）我们称之为effect函数
     * 该函数可能还会有一个返回值，也是一个函数，我们称之为清除函数
     * 第二个参数，是一个数组，称之为依赖项
     * 
     */

    /**
     * 情况一：依赖项是一个空数组的时候，effect函数相当于是componentDidMount
     * 
     */
    // useEffect(()=>{
    //    console.log('effect函数执行了 ----相当于componentDidMount') 
    // },[]);

    /**
     * 情况二：依赖项如果不传递
     * 
     */
    // useEffect(()=>{
    //     //相当于componentDidMount和componentDidUpdate的结合体
    //     console.log('effect函数执行了  依赖项没有传递')
    // });

    /**
     * 情况三：依赖项传递了有限个元素
     * 
     */
    // useEffect(()=>{
    //     console.log('effect函数执行了  依赖项传递了有限个元素')
    // },[sex]);
    /**
     * 情况四：清除函数的执行时机
     * 
     */
    // useEffect(()=>{
    //     console.log('effect函数执行了')
    //     return ()=>{
    //         //相当于compnentWillUnmount
    //         console.log('清除函数执行了')
    //     }
    // },[]);
    useEffect(() => {
        console.log('effect函数执行了')
        return () => {
            //相当于compnentWillUnmount
            console.log('清除函数执行了')
        }
    });

    function change() {
        setName('王五')
    }
    function add(){
        setCount(count + 1);
    }

    return (
        <div>UseEffectDemo {name} {sex} {count}
            <button onClick={change}>修改</button>
            <button onClick={add}>+</button>
        </div>
    )
}

/**
 * 副用作（针对一个函数来讲）
 * 如果函数在执行过程中，对函数的外部造成了一定的影响，我们就说该函数时候副作用的。
 *
 * 反之，如果函数在执行过程中没有对函数外部造成任何影响，我们说该函数是没有副作用的
 * 该函数也被称之为**纯函数**(如果纯函数有返回值，则该返回值只取决于函数的参数)
 *
 *
 *
 */
// let a = 10;
// function test(){
//     a = 20;
// }
// test();

// function sum(a,b){
//     return a + b;
// }
// sum(1,2);