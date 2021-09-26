import FillingRegForm from "../react_components/FillingRegForm.js"
import FinishWithError from "../react_components/FinishWithError.js"
import LoginRequest from "../react_components/LoginRequest.js"
import StartChat from "../react_components/StartChat.js"
import Start from "../react_components/Start.js"
import LogError from "../react_components/LogError.js"
import ReactDOM from "react-dom"
import React from "react"

const renderService = (context, event) => (callback, onEvent) => {
  let i = 0
  onEvent((e) => {
    console.log("e render", e)
    switch (e.type) {
      case "START": {
        console.log("i", i++)
        ReactDOM.render(<Start action={(event) => callback(event)} data={e} />, document.getElementById("root"))
        break
      }
      case "LOGINREQUEST": {
        ReactDOM.render(<LoginRequest action={(event) => callback(event)} data={e} />, document.getElementById("root"))
        break
      }
      case "FINISHWITHERROR": {
        ReactDOM.render(<FinishWithError action={(event) => callback(event)} data={e} />, document.getElementById("root"))
        break
      }
      case "LOGERROR": {
        ReactDOM.render(<LogError action={(event) => callback(event)} data={e} />, document.getElementById("root"))
        break
      }
      case "FILLINGREGFORM": {
        ReactDOM.render(<FillingRegForm action={(event) => callback(event)} data={e} />, document.getElementById("root"))
        break
      }
      case "START_CHAT": {
        ReactDOM.render(<StartChat action={(event) => callback(event)} data={e} />, document.getElementById("root"))
        break
      }
      default:
        console.log("unknown state: ", e.type)
    }
  })
}

export default renderService
