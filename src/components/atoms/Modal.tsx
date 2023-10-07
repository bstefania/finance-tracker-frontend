import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../styles/atoms/Modal.scss"
import React from "react"

type ModalProps = {
  children: any
  title: string
  toggleModal: (listChanged?: boolean) => void
}

function Modal({ children, title, toggleModal }: ModalProps) {
  return (
    <div className={"modal-background"}>
      <div className="modal-content">
        <div className="header">
          <h1>{title}</h1>
          <FontAwesomeIcon
            icon={faClose}
            className="icon-with-action"
            onClick={() => toggleModal()}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
