import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        // bgcolor: (theme) =>
        //   theme.palette.mode === "dark" ? "#101010" : "#fff",
        // color: (theme) =>
        //   theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        // border: "1px solid",
        // borderColor: (theme) =>
        //   theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}
function ResetPassword() {
  // let { id } = useParams();

  const [password, setPassword] = React.useState(false);
  const [validPassword, setValidPassword] = React.useState(false);
  // console.log("ResetToken==>", id);

  const navigate = useNavigate();

  const updateResetPassword = async (e) => {
    // e.preventDefault();
    // const response = await axios.patch(
    //   `http://localhost:4000/api/resetpassword/${id}?password=${password}&validPassword=${validPassword}`
    // );
    // console.log(response);
    // navigate(`/`);
  };
  return (
    <React.Fragment>
      <Container sx={{ pt: 10, display: "fixed", justifyContent: "center" }}>
        <Box
          component="form"
          sx={{
            // "& .MuiTextField-root": { m: 1, width: "25ch" },
            display: "grid",
            justifyContent: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Item>
            <TextField
              id="outlined-password-input1"
              label="Password"
              type="password"
              onChange={setPassword}
              autoComplete="current-password"
            />
          </Item>
          <Item>
            <TextField
              id="outlined-password-input2"
              label="Valid Password"
              type="password"
              onChange={setValidPassword}
              autoComplete="current-password"
            />
          </Item>
          <Item>
            <Button
              sx={{
                justifyContent: "center",
              }}
              variant="outlined"
              onClick={updateResetPassword}
            >
              Reset Password
            </Button>
          </Item>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ResetPassword;
