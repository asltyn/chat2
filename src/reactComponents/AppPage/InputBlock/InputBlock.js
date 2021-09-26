import React from "react"

const InputBlock = (props) => {
  const dis = props.data.state === "start"
  return (
    <div id="input-block">
      <form id="form">
        <textarea id="input" onChange={props.funcs.changeInputText} value={props.data.inputText} disabled={dis}></textarea>
        <input id="button" type="button" value="SEND" onClick={props.funcs.sendMessage} disabled={dis}></input>
      </form>
    </div>
  )
}

export default InputBlock
