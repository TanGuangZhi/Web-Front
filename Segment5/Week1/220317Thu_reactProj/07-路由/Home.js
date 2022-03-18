import React from 'react';
import {Outlet} from 'react-router-dom';

export default function Home() {
  return (
    <div style={{display:'flex'}}>
        <div style={{width:200,height:500,background:'pink'}}>
            <div>账号列表</div>
            <div>添加账号</div>
        </div>
        <div style={{flex:1,background:'red'}}>
                <Outlet/>
        </div>
    </div>
  )
}
