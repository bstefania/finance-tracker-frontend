import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/atoms/Modal.scss";
import "../../styles/common.scss";

type ModalProps = {
  children: any;
  title: string;
  toggleModal: (listChanged?: boolean) => void;
};

function Modal(props: ModalProps) {
  return (
    <div className={"modal-background"}>
      <div className="modal-content">
        <div className="header">
          <h1>{props.title}</h1>
          <FontAwesomeIcon
            icon={faClose}
            className="icon-with-action"
            onClick={() => props.toggleModal()}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
