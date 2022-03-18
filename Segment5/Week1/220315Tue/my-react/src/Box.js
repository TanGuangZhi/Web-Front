/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-16 19:25:37 Wed
 * @LastEditTime: 2022-03-16 20:17:20 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import React, { useState } from 'react';
export function Box(props) {
    const [sexObj, setSexObj] = useState({ sex: '男' });
    function changeNameAndSex() {
        //注意：如果值是引用类型的，则需要修改引用，否则界面不会更新
        setSexObj({
            ...setSexObj,
            sex: '女'
        });
        console.log(sexObj);
    }
    console.log(sexObj);
    return (
        <button className="square"
            // onClick={() => props.onClick()}
            onClick={(changeNameAndSex)}
        >
            {/* {this.props["data-value"]} */}
            {props["data-value"]}
        </button>
    );
}
