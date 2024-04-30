
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from '../../../Services/call';

import './Login.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';



const Login = (props) => {

  const {
    signInUser,
    registerUser
  } = props;

  const navigate = useNavigate();
  const [activateSignup, setActivateSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {


    if (activateSignup) {
      await call(registerUser, username, email, password, navigate);
    }
    else {
      await call(signInUser, email, password, navigate);
    }
  };

  return (<>
  <div className='masterLoginSIgnupPage'>
    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>


          {activateSignup && <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg" onChange={(e) => setUsername(e.target.value)} />}
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />


          <div className="d-flex justify-content-between mx-0 mb-4">
            {!activateSignup && <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />}
            <a href="#" onClick={() => setActivateSignup(!activateSignup)}>{activateSignup ? "Already have an account? Sign In" : "Dont have an account? Sign Up"}</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={() => handleSubmit()}>{activateSignup ? "SIGN UP" : "SIGN IN" }</MDBBtn>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  </div>
  </>
  );
}
export default Login;


// <ThemeProvider theme={defaultTheme}>
//   <Container component="main" maxWidth="xs">
//     <CssBaseline />
//     <Box
//       sx={{
//         marginTop: 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//         <LockOutlinedIcon />
//       </Avatar>
//       <Typography component="h1" variant="h5">
//         {activateSignup ? 'Sign Up' : 'Sign In'}
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//         {activateSignup && <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="name"
//           label="Username"
//           name="username"
//           autoComplete="username"
//           autoFocus
//         />}
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="email"
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           autoFocus
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           name="password"
//           label="Password"
//           type="password"
//           id="password"
//           autoComplete="current-password"
//         />
//         {!activateSignup && <FormControlLabel
//           control={<Checkbox value="remember" color="primary" />}
//           label="Remember me"
//         />}
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//         >
//           {activateSignup ? 'Sign Up' : 'Sign In'}
//         </Button>
//         <Grid container>

//           <Grid item>
//             <a href='#' onClick={() => setActivateSignup(!activateSignup)}>
//               {`Don't have an account? ${activateSignup ? 'Sign Up' : 'Sign In'}`}
//             </a>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   </Container>
// </ThemeProvider>