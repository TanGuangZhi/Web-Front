import React,{useState} from 'react';
import FunctionalComp from './FunctionalComp';
import UseSstateDemo from './UseSstateDemo';
import UseEffectDemo from './UseEffectDemo';
import UseEffectDemo2 from './useEffectDemo2';
import UseRefDemo from './UseRefDemo';
import UseMemoDemo from './UseMemoDemo';
import Wrapper from './自定义hook/Wrapper';

export default function FuncCompWrapper() {
  const [isShow,setIsShow] = useState(true)
  function toggle(){
    setIsShow(!isShow);
  }
  return (
    <div>
      {/* <FunctionalComp name="张三" msg="哈哈哈哈 我是函数组件哦"/> */}
      {
        isShow && <Wrapper/>
      }
      <button onClick={toggle}>切换组件</button>
      
      </div>
  )
}
