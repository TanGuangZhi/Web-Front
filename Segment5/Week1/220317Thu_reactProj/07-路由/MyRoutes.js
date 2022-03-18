import React from 'react';
import {useRoutes,Navigate} from 'react-router-dom';
const Home = React.lazy(()=>import('./Home'));
const Login = React.lazy(()=>import('./Login'));
const Reg = React.lazy(()=>import('./Reg'));
const NotFound = React.lazy(()=>import('./NotFound'));
const AccountsList = React.lazy(()=>import('./AccountsList'));
const AddAccount = React.lazy(()=>import('./AddAccount'));
const routes = [
    {
        path:'/',
        element:<Navigate to={"/home"} />
    },
    {
        path:'login',
        element:<Login/>
    },
    {
        path:'reg/:test',
        element:<Reg/>
    },
    {
        path:'reg',
        element:<Reg/>
    },
    {
        path:'home',
        element:<Home/>,
        children:[
            {
                index:true,
                element:<div>改路径默认信息</div>
            },
            {
                path:'accountsList',
                element:<AccountsList/>
            },
            {
                path:'addAccount',
                element:<AddAccount/>
            }
        ]
    },
    {
        path:"*",
        element:<NotFound/>
    }
];
export default function MyRoutes() {
    const element = useRoutes(routes);
  return element;
}
