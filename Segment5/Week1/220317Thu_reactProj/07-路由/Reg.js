import React from 'react'
import {useParams,useSearchParams} from 'react-router-dom';

export default function Reg() {
  const {test} = useParams();
  const [searchParams,setSearchParams] = useSearchParams();
  console.log(searchParams.getAll('a'));
  // const res = searchParams.entries();
  // const res = searchParams.keys();
  const res = searchParams.values();
  console.log(res)
  for (const v of res) {
      console.log('v',v)
  }
  function setHandler(){
    // setSearchParams({
    //   c:100,
    //   d:20,
    //   e:3
    // })
    setSearchParams([['c',100],['d',20]  ]);
  }
  return (
    <div>Reg <button onClick={setHandler}>设置search params</button></div>
  )
}
