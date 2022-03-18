import React,{useEffect,useState} from 'react'
import useData from './useData';
export default function Comp1() {
    // const [data,setData] = useState([]);
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         const list = [{a:1},{a:2},{a:3}];//后端服务器返回的数据
    //         setData(list);
    //     },1000);
       
    // },[]);
    const {data} = useData()
  return (
    <div>Comp1  

        {
            data.map((item,index)=>{
                return <div key={index}>{item.a}</div>
            })
        }
    </div>
  )
}
