import { CardContent } from "../muiComponents/CardContent";
import { Card } from "../muiComponents/Card";
import { Button } from "../muiComponents/Button";
import { Typography } from "../muiComponents/Typography";
import { Grid } from "../muiComponents/Grid";
import { TextField } from "../muiComponents/TextField";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import backgroundImage from "../images/medical.jpg";
import { blue } from "@mui/material/colors";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, InputLabel } from "../muiComponents/InputLabel";
import { setRef } from "@mui/material";
import axios from 'axios';

const styles = {
  // backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100vh",
};

// import "./App.css";

// var cardStyle = {
//   display: 'block',
//   width: '30vw',
//   transitionDuration: '0.3s',
//   height: '35vw'
// }

function App() {
  // const [type, setType] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password1, setPassword1] = React.useState("");

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("******")
    axios({
      method: 'post',
      url: 'http://localhost:5001/users',
      data: {
        firstName: firstname,
        lastName: lastname,
        email:email,
        password:password,
        // password1:password1
        // type:type

      }
    });
  }

  const handleChange = (event) => {
    console.log(event)
    switch (event.target.name) {
      // case "type":
      //   setType(event.target.value);
      //   break;
      //
      case "firstname":
        setFirstname(event.target.value);
        break;
      case "lastname":
        setLastname(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "password1":
        setPassword1(event.target.value);
        break;

      default:
        break;
    }
  };
  return (
    <div className="App">
      <div style={styles}>
        <header className="App-header">
          <Typography
            gutterBottom
            variant="h3"
            align="center"
            style={{ color: blue[500] }}
            margin-top="20px"
          >
            App
          </Typography>

          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <Card
                style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {" "}
                    Registration Form
                  </Typography>
                  <form>
                    <Grid container spacing={2}>
                      <Grid xs={12} sm={6} item>
                        <TextField
                          name="firstname"
                          value={firstname}
                          label="First Name"
                          placeholder="Enter first name"
                          variant="outlined"
                          fullWidth
                          required
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid xs={12} sm={6} item>
                        <TextField
                          name="lastname"
                          value={lastname}
                          label="Last Name"
                          placeholder="Enter last name"
                          variant="outlined"
                          fullWidth
                          required
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <TextField
                          name="email"
                          value={email}
                          type="email"
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
                        <TextField
                          name="password1"
                          value={password1}
                          type="Password"
                          label="Repeat password"
                          placeholder="Enter Repeat Password"
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
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid>
                      {/* <Box flexGrow={1} /> */}
                      <div class="form-link d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <span>
                          <a href="/Login" class="signup-link">
                            Already have an account?
                          </a>
                        </span>
                      </div>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </header>
      </div>
    </div>
  );
}

export default App;
