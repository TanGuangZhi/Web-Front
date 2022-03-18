import {useState,useEffect} from 'react'
export default function useData(){
    const [data,setData] = useState([])
    useEffect(()=>{
        setTimeout(()=>{
            const list = [{a:1},{a:2}];
            setData(list);
        },1000);
    },[]);
    return {
        data,
        setData,
    }
}