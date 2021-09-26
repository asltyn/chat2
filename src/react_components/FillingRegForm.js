import React from "react"

const FillingRegForm = ({ action, data }) => {
  return (
    <div>
      <h1>Registration Form</h1>
      <div>
        <div>
          <span>Username:</span>
          <input type="text" onChange={(e) => action({ type: "FILLNAME", data: e.target.value })}></input>
        </div>
        <div>
          <span>Password:</span>
          <input type="text" onChange={(e) => action({ type: "FILLPASSWORD", data: e.target.value })}></input>
        </div>
        <div>
          <input type="button" value="Submit" onClick={() => action("SUBMIT")}></input>
          <input type="button" value="Cancel" onClick={() => action("CANCEL")}></input>
        </div>
      </div>
    </div>
  )
}

export default FillingRegForm
