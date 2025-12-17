import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });


const handleLogin = async(e) => {
      e.preventDefault()
      let res = await axios.post('http://localhost:3000/api/login',loginData);
      if (res.data.success === true) {
      localStorage.setItem('auth-token',res.data.token);
       window.location.replace('/')
    }
    else{
      alert(res.data.message)
    }
    
  };
const handleSignup = async (e) => {
  e.preventDefault(); 

  try {
    let res = await axios.post('http://localhost:3000/api/signup', signupData)        
    alert(res.data.message);

    if (res.data.success === true) {
    localStorage.setItem('auth-token',res.data.token);
      window.location.replace('/')
    }
  } catch (err) {
    console.error(err);
    alert("Signup failed");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>Login</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>Sign Up</button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="auth-form">
            <h2>Sign Up</h2>
            <input
              type="text"
              placeholder="Name"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
