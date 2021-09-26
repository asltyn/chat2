import React from "react"
import Contacts from "./Contacts.js"
import ModalFindContact from "./ModalFindContact.js"
import ModalAddContact from "./ModalAddContact.js"
import Ring from "../../Ring.js"

const ContactsBlock = (props) => (
  <div id="contacts-block">
    <div id="contacts">
      <Contacts {...props} />
    </div>
    <div id="add-contact">
      <input id="add-btn" type="button" value="Add contact" onClick={props.funcs.addContactHandler}></input>
    </div>
    <div id="myModal" className="modal" style={{ display: props.data.modalState === "none" ? "none" : "block" }}>
      <div className="modal-content">
        <span className="close" onClick={props.funcs.closeModalHandler}>
          &times;
        </span>
        {
          {
            input: <ModalFindContact {...props} />,
            search: <Ring />,
            find: <ModalAddContact {...props} />,
          }[props.data.modalState]
        }
      </div>
    </div>
  </div>
)

export default ContactsBlock
