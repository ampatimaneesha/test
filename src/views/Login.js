import { CardContent} from "../muiComponents/CardContent";
import { Card } from "../muiComponents/Card";
import { Button } from "../muiComponents/Button";
import { Typography } from "../muiComponents/Typography";
import { Grid } from "../muiComponents/Grid";
import { TextField } from "../muiComponents/TextField";
import React from "react";
// import "./App.css";
import { blue } from '@mui/material/colors';
import { Container } from "@mui/system";
 import backgroundImage from '../images/expense1.jpg';
import axios from 'axios';

const styles = {
   backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
};


// var cardStyle = {
//   display: 'block',
//   width: '30vw',
//   transitionDuration: '0.3s',
//   height: '35vw'
// }


function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log("******")
    try{
   const resp = await axios({
      method: 'post',
      url: 'http://localhost:5001/users/login',
      data: {
       
        email:email,
        password:password
       
       
  
      }
    });
    console.log(resp.data);
    window.localStorage.setItem('token', resp.data.token)
   
    window.location.href=`http://localhost:3000/Expenses`
    
  }
  catch(e){

  }
  }
  const handleChange = (event) => {
    console.log(event)
    switch (event.target.name) {
     
     
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      

      default:
        break;
    }
  };
  return (
    <div className="App" >
      <div style={styles}>
      <Container >
      <header className="App-header">
        <Typography gutterBottom variant="h3" align="center" style={{color: blue[500]}} >
          App
        </Typography>
      
        <Grid
  container
  spacing={0}
  style={{ minHeight: '80vh',textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center' }}
 >
        <Card  style={{maxWidth:450,margin:"0 auto",padding:"20px 5px"}}>
          <CardContent >
            <Typography gutterBottom variant="h5"> Login Form</Typography>
            <form>
            <Grid container spacing={2}>
             
              <Grid xs={12} item>
                <TextField
                name="email"
                type="email"
                value={email}
               
                  label="Email"
                  placeholder="Enter email"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid xs={12} item>
                <TextField
                name="password"
                value={password}
                  type="Password"
                  label="password"
                  placeholder="Enter Password"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
             
             

              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  // color="primary"
                  backgroundColor="orange"
                  fullWidth
                  onClick={handleSubmit}
                >
                  
                  Login
                </Button>
              </Grid>
            </Grid>
            <br />
            <div class="form-link">
                      <span>Don't have an account?
                      <a href="/SignUp" class="signup-link">SignUp</a>
                      </span>
                    </div>
            </form>
          </CardContent>
        </Card>
        </Grid>
      </header>
      </Container>
    </div>
    </div>
    
  );
}

export default App;
