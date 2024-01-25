import styles from "../../styles/atoms/Modal.module.scss";
import Icon from "./Icon";

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
          <Icon icon="close" withAction onClick={() => props.toggleModal()} />
        </div>
        <div className={styles["modal-body"]}>
        {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
