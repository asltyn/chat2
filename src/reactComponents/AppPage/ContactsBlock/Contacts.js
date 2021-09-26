import React from "react"

const Contacts = (props) => {
  const { contacts, activeContactId } = props.data
  return contacts.map(({ id, name }, i) => (
    <div
      className={`contact ${id === activeContactId ? "active" : ""}`}
      onClick={() => {
        props.funcs.changeActiveContact(id)
      }}
      key={i}
    >
      <span>{name}</span>
    </div>
  ))
}

export default Contacts
