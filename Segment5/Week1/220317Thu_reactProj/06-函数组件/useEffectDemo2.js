import React,{useState,useEffect} from 'react'

export default function useEffectDemo2() {
    const [count,setCount] = useState(100);
    useEffect(()=>{
        console.log('effect函数执行了')
        document.addEventListener('click',clickDom)
      const timer =   setInterval(() => {
            console.log('定时器在执行')
            // console.log('count',count)
            // setCount(count + 1);
            setCount((c)=>{
                console.log('c',c)
                return c+1
            })
        }, 1000);

        return ()=>{
            console.log('清除函数执行了')
            clearInterval(timer);
            document.removeEventListener('click',clickDom)
        }
    },[]);
    function clickDom(){
        console.log('click dom')
    }
  return (
    <div>useEffectDemo2 {count} </div>
  )
}
