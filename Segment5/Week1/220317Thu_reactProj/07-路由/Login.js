import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  console.dir(navigate)
  function goToReg(){
    navigate("/reg/123?a=10&b=20")
  }
  return (
    <div>Login
      <Link to="/reg/123?a=10&b=20">跳转到注册</Link>
      <button onClick={goToReg}>跳转到注册</button>
    </div>
  )
}
