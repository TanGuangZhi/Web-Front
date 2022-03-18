import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MyRoutes from './MyRoutes';
// import Home from './Home';
// import Login from './Login';
// import Reg from './Reg';
// import NotFound from './NotFound';
// import AccountsList from './AccountsList';
// import AddAccount from './AddAccount';
const Home = React.lazy(() => import('./Home'));
const Login = React.lazy(() => import('./Login'));
const Reg = React.lazy(() => import('./Reg'));
const NotFound = React.lazy(() => import('./NotFound'));
const AccountsList = React.lazy(() => import('./AccountsList'));
const AddAccount = React.lazy(() => import('./AddAccount'));

export default function RouterContainer() {
  
  return (
    <React.Suspense fallback={<div>加载中...</div>}>
      以及路由出口就在这里：
      <BrowserRouter>
        <MyRoutes />
        {/* <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="login" element={<Login />} />
          <Route path="reg/:test" element={<Reg />} />
          <Route path="reg" element={<Reg />} />
          <Route path="home" element={<Home />}>
              <Route index element={<div>改路径默认信息</div>}/>
              <Route path="accountsList" element={<AccountsList/>}/>
              <Route path="addAccount" element={<AddAccount/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes> */}
      </BrowserRouter>
    </React.Suspense>

  )
}


// new VueRouter({
  // mode:'history'
//   routes:[
//     {
//       path:'/',
//       component:()=>import('xxx'),
//     }
//   ]
// });