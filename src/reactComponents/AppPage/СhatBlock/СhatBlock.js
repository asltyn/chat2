import React from "react"
import Message from "./Message.js"

const ChatBlock = (props) => {
  const { contacts, activeContactId } = props.data
  const messages = contacts.find(({ id }) => id === activeContactId).messages
  if ((props.data.state = "start")) {
    return (
      <div>
        <h1>{`Welcome ${props.data.name}!`}</h1>
      </div>
    )
  }
  return (
    <div id="chat-block">
      {messages.map(({ text, pos }, i) => (
        <Message key={i} text={text} pos={pos} />
      ))}
    </div>
  )
}

export default ChatBlock
