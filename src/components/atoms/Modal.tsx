import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/atoms/Modal.module.scss";

type ModalProps = {
  children: any;
  title: string;
  toggleModal: (listChanged?: boolean) => void;
};

function Modal(props: ModalProps) {
  return (
    <div className={styles["modal-background"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["header"]}>
          <h1>{props.title}</h1>
          <FontAwesomeIcon
            icon={faClose}
            className={styles["icon-with-action"]}
            onClick={() => props.toggleModal()}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
