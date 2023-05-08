import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../styles/Modal.css"
import React from "react"

type ModalProps = {
  children: any
  title: string
  toggleModal: (listChanged?: boolean) => void
}

function Modal({ children, title, toggleModal }: ModalProps) {
  return (
    <div className={"modalBackground"}>
      <div className="modalContent">
        <div className="header">
          <h1>{title}</h1>
          <FontAwesomeIcon
            icon={faClose}
            className="iconWithAction"
            onClick={() => toggleModal()}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
