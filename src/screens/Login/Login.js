

import {
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { postLogin } from "../../store/LoginSlice";

const Login = () => {
  const [IsShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const { isAuth, isLoading, errors } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const ShowPasswordHandler = () => {
    setIsShow(!IsShow);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, actions) => {
      dispatch(postLogin(values));

      actions.resetForm();
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/dash");
    }
  }, [isAuth, navigate]);

  return (
    <div className="container">
      <div className="signin signin_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <h2>Login</h2>
          <TextField
            name="username"
            type="username"
            placeholder="Username"
            className="textField"
            error={formik.touched.username && Boolean(formik.errors.username)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <Person />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error_msg ">{formik.errors.username}</div>
          ) : null}
          <TextField
            name="password"
            type={IsShow ? "text" : "password"}
            placeholder="Password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            className="textField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Lock />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={ShowPasswordHandler}
                    edge="end"
                  >
                    {IsShow ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error_msg">{formik.errors.password}</div>
          ) : null}
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4, marginTop: 3, borderRadius: 3 }}
            margin="normal"
            disabled={!formik.values.username || !formik.values.password}
          >
            Login
          </Button>
        </form>
        {isLoading && <CircularProgress />}
        {errors && (
          <Alert sx={{ m: 3 }} severity="error">
            {errors}
          </Alert>
        )}
      </div>
    </div>
  );
};
export default Login;
