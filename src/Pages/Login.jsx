import React, { useState } from "react";
import loginImg from "../assets/loginImg.avif";
import { Form, FloatingLabel, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../Services/allAPI";
const Login = () => {
  const navigate = useNavigate();
  const [isSpinner, setIsSpinner] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(userInput);
  const login = async (e) => {
    e.preventDefault();
    
    if (userInput.email && userInput.password) {
      // api call
      console.log("api call");
      
      try {
        const result = await loginAPI(userInput);
        console.log(result);
        
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setIsSpinner(true);
          setTimeout(() => {
            navigate("/dashboard");
            setUserInput({ username: "", email: "", password: "" });
            setIsSpinner(false);
        
          }, 2000);
        } else {
          if (result.response.status == 404) {
            alert(result.response.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form");
    }
  };
  return (
    <div
      style={{ minHeight: "100vh", width: "100%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={loginImg} alt="" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <h1 className="my-2">
                <i className="fa-brands fa-docker me-2"></i>
                CSTech InfoSolutions
              </h1>
              <h5>Sign In to your Account</h5>
              <Form>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    value={userInput.email}
                    onChange={(e) =>
                      setUserInput({ ...userInput, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    value={userInput.password}
                    onChange={(e) =>
                      setUserInput({ ...userInput, password: e.target.value })
                    }
                    placeholder="Password"
                  />
                </FloatingLabel>
                <div className="mt-3">
                  <button
                    onClick={login}
                    className="btn btn-primary mb-2 d-flex"
                  >
                    Login
                    {isSpinner && (
                      <Spinner
                        animation="border"
                        variant="light"
                        className="ms-1"
                      />
                    )}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
