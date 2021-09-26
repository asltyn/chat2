import React from "react"
import Ring from "../Ring.js"
import LoginForm from "./LoginForm.js"

const LoginPage = (props) => {
  return (
    <div id="login-block">
      <h1 id="app-name">SimpleChat</h1>
      {props.data.serverWait ? <Ring /> : <LoginForm {...props}></LoginForm>}
    </div>
  )
}

export default LoginPage
