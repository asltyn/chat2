import React from "react"

const LoginForm = (props) => {
  return (
    <div>
      <div className="log">
        <span className="inp-sp">Username:</span>
        <input type="text" className="inp" value={props.data.login} onChange={props.funcs.changeLoginInput}></input>
      </div>
      <div className="log">
        <span className="inp-sp">Password:</span>
        <input type="text" className="inp" value={props.data.password} onChange={props.funcs.changePasswordInput}></input>
      </div>
      <div id="buttons">
        <input className="btn" type="button" value="Enter" onClick={props.funcs.enterHandler}></input>
        <input className="btn" type="button" value="Register" onClick={props.funcs.registerHandler}></input>
      </div>
      <div id="myModal" className="modal" style={{ display: props.data.modal }}>
        <div className="modal-content">
          <span className="close" onClick={props.funcs.closeModalHandler}>
            &times;
          </span>
          <p>{props.data.modalText}</p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
