import React,{useState} from 'react'

export default function UseSstateDemo() {
    const [name,setName] = useState('李四');
    const [sex,setSex] = useState('男');
    const [obj,setObj] = useState({age:20})


    function change(){
        // setName('赵六')
        // setSex('女')
        // console.log('name',name,sex)
        obj.age = 30;
        setObj({...obj});//引用地址要和原来不一样才可以更新
        console.log(obj)
    }
    console.log('name',name)
    
  return (
    <div>我叫：{name} {sex}  {obj.age} <button onClick={change}>修改</button></div>
  )
}
