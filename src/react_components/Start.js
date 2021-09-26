import React from "react"
import Test from "./Test.js"
// const Start = ({ action, data }) => {
//   return (
//     <div>
//       <h1>SimpleChat</h1>
//       <div>
//         <div>
//           <span>Username:</span>
//           <input type="text" defaultValue={data.name} onChange={(e) => action({ type: "FILLNAME", data: e.target.value })}></input>
//         </div>
//         <div>
//           <span>Password:</span>
//           <input type="text" onChange={(e) => action({ type: "FILLPASSWORD", data: e.target.value })}></input>
//         </div>
//         <div>
//           <input type="button" value="Enter" onClick={() => action("LOGIN")}></input>
//           <input type="button" value="Register" onClick={() => action("REGISTER")}></input>
//         </div>
//       </div>
//     </div>
//   )
// }
const Start = (props) => <Test {...props} />
export default Start
