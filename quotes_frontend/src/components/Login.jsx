import React from "react";
import { Button, Grid, Header } from "semantic-ui-react";

const Login = () => {
  return (
    <div className="ui left aligned container formBorder">
        <Header size='huge'>Login</Header>
      
      <form className="ui form">

        <div className="field">
          <label>Email</label>
          <input type="email" name="last-name" placeholder="youremail@example.com" />
        </div>

        <div className="field">
            
          <label>Password</label>
          <input type="password" name="last-name" placeholder="Password" />
        </div>

        {/* <button className="ui primary button" type="submit">
          Signup
        </button> */}
        {/* <div className="ui right aligned container">
        <button className="ui primary button" type="submit">
          Login
        </button>
        </div> */}

        <Grid columns={2}>
          <Grid.Column>
            <Button className="ui primary button" type="submit">
              Login
            </Button>
          </Grid.Column>

          <Grid.Column textAlign="right">
            New User? 
            <Button className="ui button" type="submit">
              Signup
            </Button>
          </Grid.Column>
        </Grid>

      </form>
    </div>
  );
};

export default Login;



