/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-16 14:37:02 Wed
 * @LastEditTime: 2022-03-16 14:48:29 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import React, { Component } from 'react'

export default class List extends Component {
    state = {
        list: [
            { name: "111", sex: "nan", age: "20" },
            { name: "131", sex: "nan", age: "24" },
            { name: "121", sex: "nan", age: "21" },
        ]
    }
    render() {
        const { list } = this.state;
        return (
            <div>
                {
                    list.map((item, index) => {
                        return <div key={index} >name={item.name}</div>
                    })
                }
                <div>111</div>
            </div>
        )
    }
}
