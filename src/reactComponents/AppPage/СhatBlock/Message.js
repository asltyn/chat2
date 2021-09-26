import React from "react"

const Message = ({ text, pos }) => {
  const divRef = React.useRef(null)
  React.useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" })
  })
  return (
    <div className={`message ${pos}`} ref={divRef}>
      <span>{text}</span>
    </div>
  )
}

export default Message
