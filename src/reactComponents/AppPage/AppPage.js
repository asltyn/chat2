import React from "react"
import ContactsBlock from "./ContactsBlock/ContactsBlock.js"
import InputBlock from "./InputBlock/InputBlock.js"
import ChatBlock from "./СhatBlock/СhatBlock.js"

const AppPage = (props) => (
  <div id="container">
    {<ContactsBlock {...props} />}
    {<InputBlock {...props} />}
    {<ChatBlock {...props} />}
  </div>
)

export default AppPage
