import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import { loginUser } from "../../actions/auth";
import hasToken from "../../services/authService";
import loginImg from "../../assets/Login.png";

import LogoImg from "../../assets/logo.svg";
//import SofiaLogo from "../../components/Icons/SofiaLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";

const Login = (props) => {

  const [state, setState] = useState({
    email: 'admin@flatlogic.com',
    password: 'password',
  })

  const doLogin = (e) => {
    e.preventDefault();
    props.dispatch(loginUser({ password: state.password, email: state.email }))
  }

  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const { from } = props.location.state || { from: { pathname: '/template' }};
  if (hasToken(JSON.parse(localStorage.getItem('authenticated')))) {
    return (
      <Redirect to={from} />
    )
  }

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
        <Col xs={0} lg={6} className="right-column">
            <div>
              <img src={loginImg}  alt="Error page" />
            </div>
          </Col>
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Login</p>
                <div className="logo-block">
                <img style={{height:'40px'}} src={LogoImg} alt="Logo" />
                  <p className="mb-0">SLEEPY OWL</p>
                </div>
              </div>
              {/* <div className="auth-info my-2">
                <p>This is a real app with Node.js backend - use <b>"admin@flatlogic.com / password"</b> to login!</p>
              </div> */}
              <form onSubmit={(event) => doLogin(event)}>
                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={state.email}
                    onChange={(event) => changeCreds(event)}
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup  className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Password</FormText>
                    <Link to="/error">Forgot password?</Link>
                  </div>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={state.password}
                    onChange={(event) => changeCreds(event)}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button className="rounded-pill my-3" type="submit" color="secondary-red">Login</Button>
                </div>             
                  <Link to="/register">Don’t have an account? Sign Up here</Link>
              </form>
            </Widget>
          </Col>
        
        </Row>
      </Container>      
    </div>
  )
}


Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
