import React,{useState,useMemo} from 'react'

export default function UseMemoDemo() {
    const [firstName,setFirstName] = useState('张');
    const [lastName,setLastName] = useState('三');
    const name = useMemo(()=>{
        return firstName + lastName;
    },[firstName,lastName]);
    function change(){
        setFirstName('李');
    }
  return (
    <div>UseMemoDemo {name} <button onClick={change}>修改</button></div>
  )
}
