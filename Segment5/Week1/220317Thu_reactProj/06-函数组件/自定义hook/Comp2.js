import React, { useState, useEffect } from 'react'
import useData from './useData';
export default function Comp2() {
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     setTimeout(() => {
    //         const list = [{ name: '张三' }, { name: "李四" }];
    //         setData(list)
    //     }, 1000);
    // }, []);
    const {data} = useData()
    return (
        <div>Comp2

            {
                data.map((item, index) => {
                    return <h1 key={index}>{item.a}</h1>
                })
            }
        </div>
    )
}
