import styles from "../../styles/atoms/Modal.module.scss";
import Icon from "./Icon";

type ModalProps = {
  open: boolean;
  children: any;
  title: string;
  toggleModal: (listChanged?: boolean) => void;
};

const Modal = (props: ModalProps) => {
  return (
    <dialog open={props.open} className={styles["modal-background"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["header"]}>
          <h1>{props.title}</h1>
          <Icon icon="close" withAction onClick={() => props.toggleModal()} />
        </div>
        <div className={styles["modal-body"]}>
          {props.children}
        </div>
      </div>
    </dialog>
  );
}

export default Modal;