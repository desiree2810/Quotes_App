import React, { useState } from "react";
import { Link } from 'react-router-dom';
// import { Button, Grid, Header } from "semantic-ui-react";

const Login = () => {

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  return (

    <div className=" container d-flex justify-content-center align-items-center vh-100" style={{ padding:"10px"}}>
    <div className="card p-6" style={{ display: "flex" ,  backgroundColor:"#8ec777", width: "43rem", borderRadius: "10px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
      <h2 className="card-title text-left mb-4">Login</h2>
      <form>
        <div className="form-group mb-3">
          <input 
          type="email" 
          className="form-control" 
          id="email" 
          placeholder="Enter Email: example@email.com" 
          // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input type="password" className="form-control" id="password" placeholder="Enter Password" />
        </div>
        <div >
          <div className="buttonset">
            {/* <small style={{ fontSize: "0.7rem" }}>Already have an account? </small>
            <a href="#" style={{ color: "blue", fontSize: 'small', marginLeft: '5px' }}>Login</a> */}
            <button className="btn btn-primary mr-5 px-3 py-2">Login</button>
            <Link to="/signup">
             <button className="btn btn-warning px-3 py-2">Signup</button>
             </Link>
          </div>

        </div>
      </form>
    </div>
  </div>
  );
};

export default Login;