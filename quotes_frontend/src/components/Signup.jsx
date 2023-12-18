import React from "react";
import { Button, Grid, Header } from "semantic-ui-react";

const Signup = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card">
        <h2 className="card-title text-center">Register </h2>
        <div className="card-body py-md-9">
          <form _lpchecked="1">
            <div className="form-group">
              <input type="text" className="form-control" id="name" placeholder="Name" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            {/* <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                placeholder="confirm-password"
              />
            </div> */}
            <div className="d-flex flex-row align-items-center justify-content-between">
              <a href="#">Login</a>
              <button className="btn btn-primary">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
