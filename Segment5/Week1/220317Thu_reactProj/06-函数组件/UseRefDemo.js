import React,{useRef} from 'react'

export default function UseRefDemo() {
    const inputRef = useRef(null);
    
    function getInputVal() {
       
        console.log('inputRef',inputRef)
        const val = inputRef.current.value;
        console.log('val',val)
    }
    return (
        <React.Fragment>
            <input ref={inputRef} /> <button onClick={getInputVal}>点我获取input输入值</button>
        </React.Fragment>

    )
}
